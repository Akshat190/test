from django.db import models
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import pre_delete
from django.dispatch import receiver

# VPS-only storage - no external dependencies needed

# Create your models here.
class Celebration(models.Model):
    CELEBRATION_TYPES = [
        ('festival', 'Festival'),
        ('event', 'School Event'),
        ('sports', 'Sports Event'),
        ('cultural', 'Cultural Event'),
        ('academic', 'Academic Event'),
        ('other', 'Other'),
    ]
    
    festivalname = models.CharField(max_length=255, verbose_name='Celebration Name')
    description = models.TextField(blank=True, verbose_name='Description')
    celebration_type = models.CharField(max_length=20, choices=CELEBRATION_TYPES, default='festival', verbose_name='Type')
    # VPS local storage only
    image = models.ImageField(upload_to='festival/images/', verbose_name='Main Image', blank=True, null=True)
    date = models.DateTimeField(verbose_name='Date')
    is_featured = models.BooleanField(default=False, verbose_name='Feature on Homepage')
    
    class Meta:
        verbose_name = 'Celebration'
        verbose_name_plural = 'Celebrations'
        ordering = ['-date']
    
    def __str__(self):
        return self.festivalname
        
    def photo_count(self):
        """Return the number of additional photos for this celebration"""
        return self.celebrationphoto_set.count()

    def get_image_url(self):
        """Return the VPS local image URL"""
        return self.image.url if self.image else None


class CelebrationPhoto(models.Model):
    """Model for additional photos for a celebration"""
    celebration = models.ForeignKey(Celebration, on_delete=models.CASCADE)
    # VPS local storage only
    photo = models.ImageField(upload_to='festival/gallery/', verbose_name='Photo', blank=True, null=True)
    caption = models.CharField(max_length=255, blank=True, verbose_name='Caption')
    order = models.IntegerField(default=0, verbose_name='Display Order')
    
    class Meta:
        verbose_name = 'Celebration Photo'
        verbose_name_plural = 'Celebration Photos'
        ordering = ['celebration', 'order']
        
    def __str__(self):
        return f"{self.celebration.festivalname} - Photo {self.order}"

    def get_photo_url(self):
        """Return the VPS local photo URL"""
        return self.photo.url if self.photo else None

class Gallery(models.Model):
    """Model for gallery categories"""
    CATEGORY_CHOICES = [
        ('festival', 'Festival'),
        ('event', 'School Event'),
        ('sports', 'Sports Event'),
        ('cultural', 'Cultural Event'),
        ('academic', 'Academic Event'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100, verbose_name='Gallery Name')
    description = models.TextField(blank=True, verbose_name='Description')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other', verbose_name='Category')
    # VPS local storage only
    thumbnail = models.ImageField(upload_to='gallery/thumbnails/', blank=True, null=True, verbose_name='Thumbnail')
    date_created = models.DateTimeField(default=timezone.now, verbose_name='Date Created')
    is_featured = models.BooleanField(default=False, verbose_name='Feature on Homepage')
    
    class Meta:
        verbose_name = 'Gallery'
        verbose_name_plural = 'Galleries'
        ordering = ['-date_created']
    
    def __str__(self):
        return self.name
    
    def image_count(self):
        """Return the number of images in this gallery"""
        return self.galleryimage_set.count()
    
    def get_thumbnail_url(self):
        """Return the VPS local thumbnail URL"""
        if self.thumbnail:
            return self.thumbnail.url
        
        # If no thumbnail, try to get the first image in the gallery
        first_image = self.galleryimage_set.first()
        if first_image:
            return first_image.get_image_url()
        return None


class GalleryImage(models.Model):
    """Model for individual images in a gallery"""
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True, verbose_name='Title')
    # VPS local storage only
    image = models.ImageField(upload_to='gallery/images/', blank=True, null=True, verbose_name='Image')
    caption = models.CharField(max_length=255, blank=True, verbose_name='Caption')
    description = models.TextField(blank=True, verbose_name='Description')
    date_added = models.DateTimeField(default=timezone.now, verbose_name='Date Added')
    order = models.IntegerField(default=0, verbose_name='Display Order')
    
    class Meta:
        verbose_name = 'Gallery Image'
        verbose_name_plural = 'Gallery Images'
        ordering = ['gallery', 'order', '-date_added']
    
    def __str__(self):
        if self.title:
            return f"{self.gallery.name} - {self.title}"
        return f"{self.gallery.name} - Image {self.order}"
    
    def get_image_url(self):
        """Return the VPS local image URL"""
        return self.image.url if self.image else None


class CarouselImage(models.Model):
    # URL choices for button links
    URL_CHOICES = [
        ('/', 'Home'),
        ('/aboutSchool/', 'About School'),
        ('/brief/', 'Executive Brief'),
        ('/gallery/', 'Gallery'),
        ('/contact/', 'Contact Us'),
        ('/chandkheda/', 'Chandkheda Campus'),
        ('/chattral/', 'Chattral Campus'),
        ('/iffco/', 'IFFCO Campus'),
        ('/kadi/', 'Kadi Campus'),
        ('#', 'No Link (Stay on Page)'),
    ]
    
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=200, blank=True)
    # VPS local storage only
    image = models.ImageField(upload_to='carousel/images/', blank=True, null=True)
    button_text = models.CharField(max_length=50, default='Learn More')
    button_link = models.CharField(max_length=100, choices=URL_CHOICES, default='/')
    order = models.IntegerField(default=0, help_text='Order in which to display the carousel image')
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Carousel Image'
        verbose_name_plural = 'Carousel Images'
    
    def __str__(self):
        return self.title

    def get_image_url(self):
        """Return the VPS local image URL"""
        return self.image.url if self.image else None

# VPS-only storage - Django handles local file deletion automatically
# No external API calls needed
