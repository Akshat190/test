from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import Celebration, CarouselImage, CelebrationPhoto, Gallery, GalleryImage
from django.contrib.auth.decorators import login_required
from django.core.management import call_command
from django.conf import settings
import io
import sys
# Create your views here.
def home(request):
    # Set default empty values
    carousel_images = []
    celebrations = []
    featured_galleries = []
    
    # Check if the tables exist in the database
    from django.db import connection
    tables = connection.introspection.table_names()
    
    # Only try to query if the tables exist
    if 'khschool_carouselimage' in tables:
        try:
            carousel_images = CarouselImage.objects.filter(is_active=True).order_by('order')
        except Exception as e:
            # Log the error but continue with empty list
            print(f"Error loading carousel images: {str(e)}")
    
    # Try to get featured galleries first
    if 'khschool_gallery' in tables:
        try:
            featured_galleries = Gallery.objects.filter(is_featured=True).order_by('-date_created')[:3]
            # For each gallery, get a sample of images
            for gallery in featured_galleries:
                gallery.sample_images = gallery.galleryimage_set.all().order_by('order')[:4]
        except Exception as e:
            # Log the error but continue with empty list
            print(f"Error loading featured galleries: {str(e)}")
    
    # If no featured galleries, fall back to celebrations
    if not featured_galleries and 'khschool_celebration' in tables:
        try:
            celebrations = Celebration.objects.all().order_by('-date')[:3]
        except Exception as e:
            # Log the error but continue with empty list
            print(f"Error loading celebrations: {str(e)}")
        
    context = {
        'carousel_images': carousel_images,
        'celebration': celebrations,
        'featured_galleries': featured_galleries
    }
    
    return render(request, 'home.html', context)

#gallery page
def gallery(request):
    # Set default empty values
    galleries = []
    category_filter = request.GET.get('category', None)
    
    # Check if the tables exist in the database
    from django.db import connection
    tables = connection.introspection.table_names()
    
    # Only try to query if the Gallery table exists
    if 'khschool_gallery' in tables:
        try:
            # Get galleries with optional category filter
            if category_filter and category_filter != 'all':
                galleries = Gallery.objects.filter(category=category_filter).order_by('-date_created')
            else:
                galleries = Gallery.objects.all().order_by('-date_created')
            
            # For each gallery, get its images
            for gallery in galleries:
                try:
                    images = gallery.galleryimage_set.all().order_by('order', '-date_added')
                    gallery.images = list(images)
                    gallery.image_count = len(gallery.images)
                except Exception as e:
                    print(f"Error loading images for gallery {gallery.id}: {str(e)}")
                    gallery.images = []
                    gallery.image_count = 0
        except Exception as e:
            print(f"Error loading galleries: {str(e)}")
            galleries = []
    
    # For backward compatibility - also get celebrations if there are no galleries
    celebrations = []
    if not galleries and 'khschool_celebration' in tables:
        try:
            celebrations = Celebration.objects.all().order_by('-date')
            for celebration in celebrations:
                try:
                    photos = celebration.celebrationphoto_set.all().order_by('order')
                    celebration.additional_photos = list(photos)
                    celebration.photo_count = len(celebration.additional_photos)
                except Exception as e:
                    print(f"Error loading additional photos for celebration {celebration.id}: {str(e)}")
                    celebration.additional_photos = []
                    celebration.photo_count = 0
        except Exception as e:
            print(f"Error loading celebrations: {str(e)}")
            celebrations = []
    
    # Get all available categories for the filter
    categories = [choice[0] for choice in Gallery.CATEGORY_CHOICES]
    
    context = {
        'galleries': galleries,
        'celebration': celebrations,  # Keep for backward compatibility
        'categories': categories,
        'current_category': category_filter or 'all'
    }
    
    return render(request, 'gallery.html', context)

#contact page
def contact(request):
    return render(request,'contact.html')

#Director-brief
def brief(request):
    return render(request,'brief.html')

#school-history
def aboutSchool(request):
    return render(request,'aboutSchool.html')

#memnagar campus page
def chandkheda(request):
    return render(request,'chandkheda.html')

def chattral(request):
    return render(request,'chattral.html')

def iffco(request):
    return render(request,'iffco.html')

def kadi(request):
    return render(request,'kadi.html')

#success stories page
def success_stories(request):
    return render(request,'success_stories.html')

#facilities page
def facilities(request):
    return render(request,'facilities.html')


#institutional goals page
def institutional_goals(request):
    return render(request,'institutional_goals.html')

#our team page
def our_team(request):
    return render(request,'our_team.html')

#team page
def team(request):
    return render(request,'team.html')

#activities page
def activities(request):
    return render(request,'activities.html')

#testimonials page
def testimonials(request):
    return render(request,'testimonials.html')


#achievements page
def achievements(request):
    return render(request,'achievements.html')

@login_required
def image_test(request):
    """
    View for testing image display from Supabase storage
    Protected by login to prevent public access
    """
    carousel_images = CarouselImage.objects.filter(is_active=True).order_by('order')
    celebrations = Celebration.objects.all().order_by('-date')
    galleries = Gallery.objects.all().order_by('-date_created')
    
    # For each celebration, get its additional photos
    for celebration in celebrations:
        celebration.additional_photos = celebration.celebrationphoto_set.all().order_by('order')
    
    # For each gallery, get its images
    for gallery in galleries:
        gallery.images = gallery.galleryimage_set.all().order_by('order', '-date_added')
    
    context = {
        'carousel_images': carousel_images,
        'celebrations': celebrations,
        'galleries': galleries
    }
    
    return render(request, 'image_test.html', context)

@csrf_exempt
@require_POST
def run_cron_job(request):
    """
    Endpoint for external cron services to trigger scheduled tasks
    Can be called by services like EasyCron, cron-job.org, etc.
    """
    # Simple authentication - check for secret key in header or POST data
    secret_key = request.META.get('HTTP_X_CRON_SECRET') or request.POST.get('secret')
    expected_secret = getattr(settings, 'CRON_SECRET_KEY', 'your-secret-key-here')
    
    if secret_key != expected_secret:
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    
    try:
        # Capture command output
        out = io.StringIO()
        task = request.POST.get('task', '')
        
        # Run the management command
        if task:
            call_command('run_scheduled_tasks', f'--task={task}', stdout=out)
        else:
            call_command('run_scheduled_tasks', stdout=out)
        
        output = out.getvalue()
        
        return JsonResponse({
            'status': 'success',
            'message': 'Cron job executed successfully',
            'output': output
        })
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)

def health_check(request):
    """
    Simple health check endpoint for keep-alive pinging
    Returns basic system status
    """
    from django.utils import timezone
    from django.db import connection
    
    try:
        # Test database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            db_status = "ok"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    current_time = timezone.now()
    
    return JsonResponse({
        'status': 'healthy',
        'timestamp': current_time.isoformat(),
        'database': db_status,
        'message': 'Service is running'
    })
