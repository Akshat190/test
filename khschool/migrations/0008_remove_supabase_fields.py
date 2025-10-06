# Generated migration to remove Supabase URL fields
# This makes the website 100% VPS-only with no external dependencies

from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('khschool', '0007_gallery_galleryimage'),
    ]

    operations = [
        # Remove Supabase URL fields from all models
        migrations.RemoveField(
            model_name='celebration',
            name='image_url',
        ),
        migrations.RemoveField(
            model_name='celebrationphoto',
            name='photo_url',
        ),
        migrations.RemoveField(
            model_name='gallery',
            name='thumbnail_url',
        ),
        migrations.RemoveField(
            model_name='galleryimage',
            name='image_url',
        ),
        migrations.RemoveField(
            model_name='carouselimage',
            name='image_url',
        ),
    ]