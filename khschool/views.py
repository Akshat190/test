from django.shortcuts import render
from django.http import JsonResponse
from django.db.utils import OperationalError
from django.views.decorators.csrf import csrf_exempt
import logging
from .models import Celebration, CarouselImage, CelebrationPhoto, Gallery, GalleryImage, Campus, ContactSubmission

logger = logging.getLogger('khschool')

# Create your views here.
def home(request):
    carousel_images = []
    celebrations = []
    featured_galleries = []
    
    class ThumbnailImage:
        def __init__(self, gallery):
            self.gallery = gallery
        
        def get_image_url(self):
            return self.gallery.get_thumbnail_url()
    
    try:
        carousel_images = CarouselImage.objects.filter(is_active=True).order_by('order')
    except OperationalError:
        carousel_images = []
    except Exception as e:
        logger.warning(f"Error loading carousel images: {str(e)}")
    
    try:
        featured_galleries = Gallery.objects.filter(is_featured=True).order_by('-date_created')[:3]
        for gallery in featured_galleries:
            sample_images = gallery.galleryimage_set.all().order_by('order')[:4]
            if sample_images:
                gallery.sample_images = sample_images
            else:
                gallery.sample_images = [ThumbnailImage(gallery)]
    except OperationalError:
        featured_galleries = []
    except Exception as e:
        logger.warning(f"Error loading featured galleries: {str(e)}")
    
    all_celebrations = []
    try:
        qs = Celebration.objects.all().order_by('-date')[:30]
        for celebration in qs:
            try:
                photos = celebration.celebrationphoto_set.all().order_by('order')
                celebration.additional_photos = list(photos)
                celebration.photo_count = len(celebration.additional_photos)
            except Exception as e:
                celebration.additional_photos = []
                celebration.photo_count = 0
        all_celebrations = list(qs)
    except OperationalError:
        all_celebrations = []
    except Exception as e:
        logger.warning(f"Error loading celebrations: {str(e)}")
        all_celebrations = []

    campuses = []
    try:
        campuses = Campus.objects.filter(is_active=True).order_by('name')
    except Exception:
        pass
        
    context = {
        'carousel_images': carousel_images,
        'celebration': all_celebrations,
        'featured_galleries': featured_galleries,
        'campuses': campuses,
        'current_campus': 'all',
    }
    
    return render(request, 'home.html', context)


def gallery(request):
    galleries = []
    category_filter = request.GET.get('category', None)

    try:
        if category_filter and category_filter != 'all':
            galleries = Gallery.objects.filter(category=category_filter).order_by('-date_created')
        else:
            galleries = Gallery.objects.all().order_by('-date_created')

        for gallery_obj in galleries:
            try:
                images = gallery_obj.galleryimage_set.all().order_by('order', '-date_added')
                gallery_obj.images = list(images)
                gallery_obj.image_count = len(gallery_obj.images)
            except Exception as e:
                logger.warning(f"Error loading images for gallery {gallery_obj.id}: {str(e)}")
                gallery_obj.images = []
                gallery_obj.image_count = 0
    except OperationalError:
        galleries = []
    except Exception as e:
        logger.warning(f"Error loading galleries: {str(e)}")
        galleries = []

    celebrations = []
    try:
        celebration_qs = Celebration.objects.all().order_by('-date')[:50]
        for celebration in celebration_qs:
            try:
                photos = celebration.celebrationphoto_set.all().order_by('order')
                celebration.additional_photos = list(photos)
                celebration.photo_count = len(celebration.additional_photos)
            except Exception as e:
                logger.warning(f"Error loading additional photos for celebration {celebration.id}: {str(e)}")
                celebration.additional_photos = []
                celebration.photo_count = 0
        celebrations = list(celebration_qs)
    except OperationalError:
        celebrations = []
    except Exception as e:
        logger.warning(f"Error loading celebrations: {str(e)}")
        celebrations = []

    categories = [choice[0] for choice in Gallery.CATEGORY_CHOICES]
    campuses = []
    try:
        campuses = Campus.objects.filter(is_active=True).order_by('name')
    except Exception:
        pass

    context = {
        'galleries': galleries,
        'celebration': celebrations,
        'categories': categories,
        'current_category': category_filter or 'all',
        'campuses': campuses,
        'current_campus': 'all',
    }

    return render(request, 'gallery.html', context)


def contact(request):
    from .forms import ContactForm

    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            submission = form.save()
            logger.info(
                "Contact form submitted: name=%s, email=%s***, subject=%s",
                submission.name,
                (submission.email[:1] if submission.email else '?'),
                submission.subject,
            )
            return render(request, 'contact.html', {'form': ContactForm(), 'success': True})
        return render(request, 'contact.html', {
            'form': form,
            'error': 'Please correct the errors below.',
        })

    return render(request, 'contact.html', {'form': ContactForm()})


def brief(request):
    return render(request, 'brief.html')


def aboutSchool(request):
    return render(request, 'aboutSchool.html')


def _get_campus(slug):
    """Helper to fetch campus by slug with documents."""
    try:
        return Campus.objects.prefetch_related('documents').get(slug=slug, is_active=True)
    except Campus.DoesNotExist:
        return None


# Fallback content per campus, used when no Campus DB row exists.
# Keys mirror the old per-campus templates so behaviour is unchanged.
CAMPUS_DEFAULTS = {
    'chandkheda': {
        'name': 'Chandkheda', 'board': 'GSEB',
        'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
        'hero_image': 'image/campus_chandkheda.jpg',
    },
    'chattral': {
        'name': 'Chhatral', 'board': 'CBSE', 'affiliation_number': '430302',
        'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
        'hero_image': 'image/campus_chhatral.jpg',
    },
    'iffco': {
        'name': 'IFFCO Township', 'board': 'GSEB',
        'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
        'hero_image': 'image/campus_iffco.jpg',
    },
    'kadi': {
        'name': 'Kadi', 'board': 'GSEB',
        'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
        'hero_image': 'image/blur.png',
    },
    'shela': {
        'name': 'Shela',
        'affiliation_label': 'Contact Number', 'affiliation_number': '6356000941/42',
        'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
        'address': 'Nr. Anand Elegance, Nr. Mahadev Elegance, VIP Road, Shela, Ahmedabad - 380057',
        'hero_image': 'image/Shela-school-image.jpeg',
    },
}


def _campus_page(request, slug):
    """Render the shared campus template for any branch.

    All fallbacks are resolved here in Python so the template only
    ever touches plain strings — no nested ``default`` lookups.
    """
    defaults = CAMPUS_DEFAULTS[slug]
    campus = _get_campus(slug)

    def _field(name):
        value = getattr(campus, name, '') if campus else ''
        if isinstance(value, str):
            value = value.strip()
        return value or defaults.get(name, '')

    info = {
        'name': _field('name') or defaults['name'],
        'board': _field('board') or defaults.get('board', ''),
        'timings': _field('timings') or defaults.get('timings', ''),
        'affiliation_label': defaults.get('affiliation_label', 'Affiliation Number'),
        'affiliation_number': _field('affiliation_number') or defaults.get('affiliation_number', ''),
        'address': defaults.get('address', ''),
        'hero_image': defaults['hero_image'],
        'photo_url': campus.get_photo_url() if campus else None,
    }
    return render(request, 'campus_detail.html', {
        'campus': campus,
        'info': info,
        'campus_slug': slug,
    })


def chandkheda(request):
    return _campus_page(request, 'chandkheda')


def chattral(request):
    return _campus_page(request, 'chattral')


def iffco(request):
    return _campus_page(request, 'iffco')


def kadi(request):
    return _campus_page(request, 'kadi')


def shela(request):
    return _campus_page(request, 'shela')


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


@csrf_exempt
def api_contact(request):
    """JSON API for the Astro contact form (POST JSON -> {success: bool}).

    CSRF-exempt by design: public JSON endpoint, rate-limited at nginx
    (contact zone). Reuses ContactForm validation so rules match the
    Django-rendered contact page.
    """
    import json as _json

    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'POST only.'}, status=405)
    from .forms import ContactForm
    try:
        payload = _json.loads(request.body.decode('utf-8') or '{}')
    except (ValueError, UnicodeDecodeError):
        return JsonResponse({'success': False, 'error': 'Invalid JSON.'}, status=400)
    if not isinstance(payload, dict):
        return JsonResponse({'success': False, 'error': 'Invalid payload.'}, status=400)
    form = ContactForm(payload)
    if form.is_valid():
        submission = form.save()
        logger.info(
            "API contact submitted: name=%s, subject=%s",
            submission.name, submission.subject,
        )
        return JsonResponse({'success': True})
    return JsonResponse(
        {'success': False, 'error': 'Please correct the errors below.', 'errors': form.errors},
        status=400,
    )


def handler404(request, exception):
    return render(request, 'errors/404.html', status=404)


def handler500(request):
    return render(request, 'errors/500.html', status=500)
