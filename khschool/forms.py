from django import forms

from .models import Celebration, CelebrationPhoto, CarouselImage, Gallery, GalleryImage


class CelebrationForm(forms.ModelForm):
    class Meta:
        model = Celebration
        fields = "__all__"


class CelebrationPhotoForm(forms.ModelForm):
    class Meta:
        model = CelebrationPhoto
        fields = "__all__"


class CarouselImageForm(forms.ModelForm):
    class Meta:
        model = CarouselImage
        fields = "__all__"


class GalleryForm(forms.ModelForm):
    class Meta:
        model = Gallery
        fields = "__all__"


class GalleryImageForm(forms.ModelForm):
    class Meta:
        model = GalleryImage
        fields = "__all__"
