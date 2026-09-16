from django import forms

from .models import Celebration, CelebrationPhoto, CarouselImage, Gallery, GalleryImage, ContactSubmission


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
        help_texts = {
            'image': 'Landscape banner, ideally 1920x800px or larger (minimum 1200x500px). Small images will look blurry on the homepage hero.',
        }

    def clean_image(self):
        from PIL import Image as PILImage
        from django.core.exceptions import ValidationError

        image = self.cleaned_data.get('image')
        # On edit forms without a new upload, image is the existing FieldFile.
        if not image or not hasattr(image, 'read'):
            return image
        try:
            image.seek(0)
            with PILImage.open(image) as img:
                width, height = img.size
            image.seek(0)
        except Exception:
            raise ValidationError('Could not read this image. Please upload a valid JPG, PNG or WebP file.')
        if width < 1200 or height < 500:
            raise ValidationError(
                f'This image is only {width}x{height}px — too small for the homepage hero and it will look '
                'blurry/invisible. Please upload a landscape banner at least 1200x500px (ideally 1920x800px).'
            )
        return image


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


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'phone', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'id': 'name', 'placeholder': 'Enter your full name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'id': 'email', 'placeholder': 'Enter your email address'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'id': 'phone', 'placeholder': 'Enter your phone number'}),
            'subject': forms.TextInput(attrs={'class': 'form-control', 'id': 'subject', 'placeholder': 'What is this regarding?'}),
            'message': forms.Textarea(attrs={'class': 'form-control', 'id': 'message', 'rows': 5, 'placeholder': 'Type your message here...'}),
        }
