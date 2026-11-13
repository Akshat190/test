"""JSON endpoints for the Next.js frontend: four read-only lists and the
public contact POST. Plain Django views; five endpoints do not justify DRF.
"""

import json
import logging

from django.http import Http404, JsonResponse
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .campuses import CAMPUS_DEFAULTS, campus_info
from .forms import ContactForm
from .models import (
    Campus,
    CarouselImage,
    Celebration,
    Gallery,
)

logger = logging.getLogger('khschool')


def _url(field_file):
    return field_file.url if field_file else None


def _campus_ref(campus):
    if not campus:
        return None
    return {'slug': campus.slug, 'name': campus.name}


@never_cache
@require_GET
def carousel(request):
    return JsonResponse([
        {
            'id': image.id,
            'title': image.title,
            'subtitle': image.subtitle,
            'image': _url(image.image),
            'button_text': image.button_text,
            'button_link': image.button_link,
            'order': image.order,
        }
        for image in CarouselImage.objects.filter(is_active=True).order_by('order')
    ], safe=False)


@never_cache
@require_GET
def celebrations(request):
    data = []
    for celebration in Celebration.objects.select_related('campus').order_by('-date'):
        photos = celebration.celebrationphoto_set.order_by('order')
        data.append({
            'id': celebration.id,
            'festivalname': celebration.festivalname,
            'description': celebration.description,
            'celebration_type': celebration.celebration_type,
            'image': _url(celebration.image),
            'date': celebration.date.isoformat(),
            'is_featured': celebration.is_featured,
            'campus': _campus_ref(celebration.campus),
            'photo_count': len(photos),
            'photos': [
                {
                    'id': photo.id,
                    'photo': _url(photo.photo),
                    'caption': photo.caption,
                    'order': photo.order,
                }
                for photo in photos
            ],
        })
    return JsonResponse(data, safe=False)


@never_cache
@require_GET
def galleries(request):
    data = []
    for gallery in Gallery.objects.order_by('-date_created'):
        images = gallery.galleryimage_set.order_by('order', '-date_added')
        data.append({
            'id': gallery.id,
            'name': gallery.name,
            'description': gallery.description,
            'category': gallery.category,
            'thumbnail': _url(gallery.thumbnail),
            'thumbnail_url': gallery.get_thumbnail_url(),
            'date_created': gallery.date_created.isoformat(),
            'is_featured': gallery.is_featured,
            'image_count': len(images),
            'images': [
                {
                    'id': image.id,
                    'title': image.title,
                    'image': _url(image.image),
                    'caption': image.caption,
                    'description': image.description,
                    'date_added': image.date_added.isoformat(),
                    'order': image.order,
                }
                for image in images
            ],
        })
    return JsonResponse(data, safe=False)


@never_cache
@require_GET
def campuses(request):
    data = []
    for campus in Campus.objects.filter(is_active=True).order_by('name'):
        data.append({
            'id': campus.id,
            'slug': campus.slug,
            'name': campus.name,
            'board': campus.board,
            'affiliation_number': campus.affiliation_number,
            'timings': campus.timings,
            'address': campus.address,
            'photo': _url(campus.photo),
            'is_active': campus.is_active,
            'documents': [
                {
                    'id': document.id,
                    'title': document.title,
                    'file': _url(document.file),
                    'order': document.order,
                }
                for document in campus.documents.order_by('order')
            ],
        })
    return JsonResponse(data, safe=False)


@never_cache
@require_GET
def campus_detail(request, slug):
    if slug not in CAMPUS_DEFAULTS:
        raise Http404
    campus = Campus.objects.prefetch_related('documents').filter(
        slug=slug, is_active=True
    ).first()
    return JsonResponse({
        'slug': slug,
        **campus_info(slug, campus),
        'documents': [
            {
                'id': document.id,
                'title': document.title,
                'file': _url(document.file),
                'order': document.order,
            }
            for document in (campus.documents.all() if campus else [])
        ],
    })


@never_cache
@require_GET
def config(request):
    return JsonResponse({
        'gallery_categories': [
            {'value': value, 'label': label}
            for value, label in Gallery.CATEGORY_CHOICES
        ],
        'celebration_types': [
            {'value': value, 'label': label}
            for value, label in Celebration.CELEBRATION_TYPES
        ],
    })


@csrf_exempt
@require_POST
def contact(request):
    try:
        payload = json.loads(request.body or '{}')
    except json.JSONDecodeError:
        payload = {}
    if not isinstance(payload, dict):
        payload = {}

    form = ContactForm(payload)
    if not form.is_valid():
        return JsonResponse({
            'errors': {
                field: [error['message'] for error in errors]
                for field, errors in form.errors.get_json_data().items()
            }
        }, status=400)

    form.save()
    logger.info(
        "Contact API submission: name=%s, email=%s***, subject=%s",
        form.instance.name,
        form.instance.email[:1] if form.instance.email else '?',
        form.instance.subject,
    )
    return JsonResponse({'ok': True})
