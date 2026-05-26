from django import forms

from .models import Celebration, CelebrationPhoto, CarouselImage, Gallery, GalleryImage


class CelebrationForm(forms.ModelForm):
    class Meta:
        model = Celebration
        fields = ['festivalname', 'description', 'celebration_type', 'image', 'date', 'is_featured']


class CelebrationPhotoForm(forms.ModelForm):
    class Meta:
        model = CelebrationPhoto
        fields = ['celebration', 'photo', 'caption', 'order']


class CarouselImageForm(forms.ModelForm):
    class Meta:
        model = CarouselImage
        fields = ['title', 'subtitle', 'image', 'button_text', 'button_link', 'order', 'is_active']


class GalleryForm(forms.ModelForm):
    class Meta:
        model = Gallery
        fields = ['name', 'description', 'category', 'thumbnail', 'date_created', 'is_featured']


class GalleryImageForm(forms.ModelForm):
    class Meta:
        model = GalleryImage
        fields = ['gallery', 'title', 'image', 'caption', 'description', 'date_added', 'order']
