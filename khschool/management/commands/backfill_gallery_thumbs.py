"""Generate grid thumbnails for galleries that do not have one yet."""

from django.core.management.base import BaseCommand
from django.db.models import Q

from khschool.image_utils import make_thumbnail
from khschool.models import Gallery


class Command(BaseCommand):
    help = 'Create a 640px thumbnail for every gallery that lacks one'

    def handle(self, *args, **options):
        galleries = Gallery.objects.filter(Q(thumbnail='') | Q(thumbnail__isnull=True))
        created = 0
        for gallery in galleries:
            image = gallery.galleryimage_set.exclude(image='').first()
            if not image:
                continue
            try:
                image.image.open('rb')
            except Exception:
                continue
            thumb = make_thumbnail(image.image)
            if thumb is None:
                continue
            gallery.thumbnail.save(f'{gallery.pk}.jpg', thumb, save=True)
            created += 1
            self.stdout.write(f'  {gallery.name}')

        self.stdout.write(self.style.SUCCESS(f'Thumbnails created: {created}'))
