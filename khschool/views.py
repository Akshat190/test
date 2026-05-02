from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
import logging
from .models import Celebration, CarouselImage, CelebrationPhoto, Gallery, GalleryImage, Campus

logger = logging.getLogger('khschool')

# Create your views here.
def home(request):
    carousel_images = []
    celebrations = []
    featured_galleries = []
    
    from django.db import connection
    tables = connection.introspection.table_names()
    
    if 'khschool_carouselimage' in tables:
        try:
            carousel_images = CarouselImage.objects.filter(is_active=True).order_by('order')
        except Exception as e:
            logger.warning(f"Error loading carousel images: {str(e)}")
    
    class ThumbnailImage:
        def __init__(self, gallery):
            self.gallery = gallery
        
        def get_image_url(self):
            return self.gallery.get_thumbnail_url()
    
    if 'khschool_gallery' in tables:
        try:
            featured_galleries = Gallery.objects.filter(is_featured=True).order_by('-date_created')[:3]
            for gallery in featured_galleries:
                sample_images = gallery.galleryimage_set.all().order_by('order')[:4]
                if sample_images:
                    gallery.sample_images = sample_images
                else:
                    gallery.sample_images = [ThumbnailImage(gallery)]
        except Exception as e:
            logger.warning(f"Error loading featured galleries: {str(e)}")
    
    if 'khschool_celebration' in tables:
        try:
            celebrations = Celebration.objects.all().order_by('-date')[:3]
        except Exception as e:
            logger.warning(f"Error loading celebrations: {str(e)}")
            celebrations = []
        
    context = {
        'carousel_images': carousel_images,
        'celebration': celebrations,
        'featured_galleries': featured_galleries
    }
    
    return render(request, 'home.html', context)


def gallery(request):
    galleries = []
    category_filter = request.GET.get('category', None)
    
    from django.db import connection
    tables = connection.introspection.table_names()
    
    if 'khschool_gallery' in tables:
        try:
            if category_filter and category_filter != 'all':
                galleries = Gallery.objects.filter(category=category_filter).order_by('-date_created')
            else:
                galleries = Gallery.objects.all().order_by('-date_created')
            
            # Prefetch related images for better performance
            for gallery_obj in galleries:
                try:
                    images = gallery_obj.galleryimage_set.all().order_by('order', '-date_added')
                    gallery_obj.images = list(images)
                    gallery_obj.image_count = len(gallery_obj.images)
                except Exception as e:
                    logger.warning(f"Error loading images for gallery {gallery_obj.id}: {str(e)}")
                    gallery_obj.images = []
                    gallery_obj.image_count = 0
        except Exception as e:
            logger.warning(f"Error loading galleries: {str(e)}")
            galleries = []
    
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
                    logger.warning(f"Error loading additional photos for celebration {celebration.id}: {str(e)}")
                    celebration.additional_photos = []
                    celebration.photo_count = 0
        except Exception as e:
            logger.warning(f"Error loading celebrations: {str(e)}")
            celebrations = []
    
    categories = [choice[0] for choice in Gallery.CATEGORY_CHOICES]
    
    context = {
        'galleries': galleries,
        'celebration': celebrations,
        'categories': categories,
        'current_category': category_filter or 'all'
    }
    
    return render(request, 'gallery.html', context)


def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        phone = request.POST.get('phone', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()
        
        # Basic validation
        if not all([name, email, subject, message]):
            return render(request, 'contact.html', {
                'error': 'Please fill in all required fields.',
                'form_data': request.POST
            })
        
        if '@' not in email or '.' not in email.split('@')[-1]:
            return render(request, 'contact.html', {
                'error': 'Please enter a valid email address.',
                'form_data': request.POST
            })
        
        full_message = f"""
New Contact Form Submission from Kapadia High School Website

Name: {name}
Email: {email}
Phone: {phone}
Subject: {subject}

Message:
{message}
"""
        
        try:
            send_mail(
                subject=f"Contact Form: {subject}",
                message=full_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=['info@kapadiahighschool.com'],
                fail_silently=False,
            )
            return render(request, 'contact.html', {'success': True})
        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
            return render(request, 'contact.html', {
                'error': 'Failed to send message. Please try again later.',
                'form_data': request.POST
            })
    
    return render(request, 'contact.html')


def brief(request):
    return render(request, 'brief.html')


def aboutSchool(request):
    return render(request, 'aboutSchool.html')


def chandkheda(request):
    return render(request, 'chandkheda.html')


def chattral(request):
    campus = None
    try:
        campus = Campus.objects.prefetch_related('documents').get(slug='chattral', is_active=True)
    except Campus.DoesNotExist:
        pass

    return render(request, 'chattral.html', {'campus': campus})


def iffco(request):
    return render(request, 'iffco.html')


def kadi(request):
    return render(request, 'kadi.html')


def shela(request):
    return render(request, 'shela.html')


def success_stories(request):
    return render(request, 'success_stories.html')


def facilities(request):
    return render(request, 'facilities.html')


def institutional_goals(request):
    return render(request, 'institutional_goals.html')


def our_team(request):
    return render(request, 'our_team.html')


def team(request):
    return render(request, 'team.html')


def activities(request):
    return render(request, 'activities.html')


def testimonials(request):
    return render(request, 'testimonials.html')


def achievements(request):
    return render(request, 'achievements.html')


def health_check(request):
    from django.utils import timezone
    from django.db import connection
    
    try:
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


def handler404(request, exception):
    return render(request, 'errors/404.html', status=404)


def handler500(request):
    return render(request, 'errors/500.html', status=500)
