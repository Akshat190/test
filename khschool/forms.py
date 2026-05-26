from django import forms

from .models import Celebration, CelebrationPhoto, CarouselImage, Gallery, GalleryImage


class MultipleFileInput(forms.FileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('widget', MultipleFileInput(attrs={'multiple': True}))
        super().__init__(*args, **kwargs)

    def to_python(self, data):
        if not data:
            return []
        if isinstance(data, list):
            return data
        return [data]

    def validate(self, value):
        for each in value:
            super().validate(each)


class CelebrationForm(forms.ModelForm):
    bulk_photos = MultipleFileField(
        required=False,
        label='Upload Multiple Photos (Ctrl+click to select multiple)'
    )

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
    bulk_images = MultipleFileField(
        required=False,
        label='Upload Multiple Images (Ctrl+click to select multiple)'
    )

    class Meta:
        model = Gallery
        fields = ['name', 'description', 'category', 'thumbnail', 'date_created', 'is_featured']


class GalleryImageForm(forms.ModelForm):
    class Meta:
        model = GalleryImage
        fields = ['gallery', 'title', 'image', 'caption', 'description', 'date_added', 'order']
