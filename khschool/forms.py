from django import forms

from .image_utils import image_size
from .models import Celebration, CelebrationPhoto, CarouselImage, Campus, Gallery, GalleryImage, ContactSubmission


class MultipleFileInput(forms.FileInput):
    allow_multiple_selected = True


# Must stay below nginx client_max_body_size and Django's
# FILE_UPLOAD_MAX_MEMORY_SIZE so oversized files fail here with a
# friendly message instead of a bare 413/400.
MAX_BULK_FILE_MB = 30


class MinImageSizeMixin:
    """Reject newly uploaded images that are too small for where they appear.

    Set ``MIN_IMAGE_SIZES = {'field': (min_width, min_height)}`` and
    ``IMAGE_PURPOSE`` in the form. Only fresh uploads are checked, so
    editing a record never fails because of an old photo.
    """

    MIN_IMAGE_SIZES = {}
    IMAGE_PURPOSE = 'the web page'

    def clean(self):
        cleaned = super().clean()
        for field, (min_w, min_h) in self.MIN_IMAGE_SIZES.items():
            uploaded = self.files.get(field)
            if not uploaded:
                continue
            size = image_size(uploaded)
            if size is None:
                self.add_error(
                    field,
                    'Could not read this image. Please upload a valid JPG, PNG or WebP file.',
                )
                continue
            width, height = size
            if width < min_w or height < min_h:
                self.add_error(
                    field,
                    f'This image is {width}×{height}px — too small for {self.IMAGE_PURPOSE}. '
                    f'Please upload at least {min_w}×{min_h}px so it stays sharp.',
                )
        return cleaned


class MultipleFileField(forms.FileField):
    def __init__(self, *args, min_size=None, purpose='the gallery', **kwargs):
        self.min_size = min_size
        self.purpose = purpose
        kwargs.setdefault('widget', MultipleFileInput(attrs={'multiple': True}))
        super().__init__(*args, **kwargs)

    def to_python(self, data):
        if not data:
            return []
        if isinstance(data, list):
            return data
        return [data]

    def validate(self, value):
        from django.core.exceptions import ValidationError

        for each in value:
            super().validate(each)
            name = getattr(each, 'name', 'file')
            content_type = getattr(each, 'content_type', '') or ''
            if not content_type.startswith('image/'):
                raise ValidationError(
                    f"'{name}' is not an image. "
                    'Please select JPG, PNG or WebP photos only.'
                )
            size_mb = (each.size or 0) / (1024 * 1024)
            if size_mb > MAX_BULK_FILE_MB:
                raise ValidationError(
                    f"'{name}' is {size_mb:.1f} MB — over the {MAX_BULK_FILE_MB} MB per-photo limit. "
                    'Please resize it (1920px wide is plenty) and try again.'
                )
            if self.min_size:
                min_w, min_h = self.min_size
                size = image_size(each)
                if size is None:
                    raise ValidationError(
                        f"'{name}' could not be read as an image. "
                        'Please upload a valid JPG, PNG or WebP file.'
                    )
                width, height = size
                if width < min_w or height < min_h:
                    raise ValidationError(
                        f"'{name}' is {width}×{height}px — too small for {self.purpose}. "
                        f'Please upload at least {min_w}×{min_h}px, or remove that photo and try again.'
                    )


class MultipleDocumentField(forms.FileField):
    """Multiple PDF upload used by the Campus "bulk import documents" field."""

    def __init__(self, *args, **kwargs):
        kwargs.setdefault('widget', MultipleFileInput(attrs={
            'multiple': True, 'accept': 'application/pdf,.pdf',
        }))
        super().__init__(*args, **kwargs)

    def to_python(self, data):
        if not data:
            return []
        if isinstance(data, list):
            return data
        return [data]

    def validate(self, value):
        from django.core.exceptions import ValidationError

        for each in value:
            super().validate(each)
            name = (getattr(each, 'name', '') or '')
            content_type = (getattr(each, 'content_type', '') or '').lower()
            if not (name.lower().endswith('.pdf') or content_type == 'application/pdf'):
                raise ValidationError(
                    f"'{name or 'file'}' is not a PDF. Please upload PDF documents only."
                )
            size_mb = (each.size or 0) / (1024 * 1024)
            if size_mb > MAX_BULK_FILE_MB:
                raise ValidationError(
                    f"'{name}' is {size_mb:.1f} MB — over the {MAX_BULK_FILE_MB} MB per-file limit."
                )


def title_from_filename(filename):
    """Derive a readable document title from an uploaded PDF filename.

    '3. NOC CERTIFICATE-CBSE.pdf' -> 'NOC CERTIFICATE CBSE'
    """
    import os
    import re

    base = os.path.splitext(os.path.basename(filename or ''))[0]
    base = re.sub(r'^[\d]+\s*[.)\-_]*\s*', '', base)   # strip leading "1. " / "3) "
    base = base.replace('_', ' ').replace('-', ' ')
    base = re.sub(r'\s+', ' ', base).strip()
    return base[:200] or 'Document'


class CelebrationForm(MinImageSizeMixin, forms.ModelForm):
    MIN_IMAGE_SIZES = {'image': (800, 600)}
    IMAGE_PURPOSE = 'the celebrations section'

    bulk_photos = MultipleFileField(
        required=False,
        min_size=(800, 600),
        purpose='the celebrations section',
        label='Upload Multiple Photos (Ctrl+click to select multiple)'
    )

    class Meta:
        model = Celebration
        fields = ['festivalname', 'description', 'celebration_type', 'image', 'date', 'is_featured']


class CelebrationPhotoForm(MinImageSizeMixin, forms.ModelForm):
    MIN_IMAGE_SIZES = {'photo': (800, 600)}
    IMAGE_PURPOSE = 'the celebrations section'

    class Meta:
        model = CelebrationPhoto
        fields = ['celebration', 'photo', 'caption', 'order']


class CarouselImageForm(MinImageSizeMixin, forms.ModelForm):
    MIN_IMAGE_SIZES = {'image': (1200, 500)}
    IMAGE_PURPOSE = 'the homepage hero'

    class Meta:
        model = CarouselImage
        fields = ['title', 'subtitle', 'image', 'button_text', 'button_link', 'order', 'is_active']
        help_texts = {
            'image': 'Landscape banner, ideally 1920x800px or larger (minimum 1200x500px). Small images will look blurry on the homepage hero.',
        }


class CampusForm(MinImageSizeMixin, forms.ModelForm):
    MIN_IMAGE_SIZES = {'photo': (1200, 600)}
    IMAGE_PURPOSE = 'the campus page hero'

    bulk_documents = MultipleDocumentField(
        required=False,
        label='Bulk import documents (PDF only — Ctrl+click to select multiple)',
        help_text='Titles are taken from the filenames. You can rename them afterwards in the list below.',
    )

    class Meta:
        model = Campus
        fields = ['slug', 'name', 'board', 'affiliation_number', 'timings', 'address', 'photo', 'is_active']
        help_texts = {
            'photo': 'Landscape photo, ideally 1920x800px (minimum 1200x600px). It fills the top of the campus page.',
        }


class GalleryForm(MinImageSizeMixin, forms.ModelForm):
    MIN_IMAGE_SIZES = {'thumbnail': (800, 600)}
    IMAGE_PURPOSE = 'the gallery cards'

    bulk_images = MultipleFileField(
        required=False,
        min_size=(800, 600),
        purpose='the gallery',
        label='Upload Multiple Images (Ctrl+click to select multiple)'
    )

    class Meta:
        model = Gallery
        fields = ['name', 'description', 'category', 'thumbnail', 'date_created', 'is_featured']


class GalleryImageForm(MinImageSizeMixin, forms.ModelForm):
    MIN_IMAGE_SIZES = {'image': (800, 600)}
    IMAGE_PURPOSE = 'the gallery'

    class Meta:
        model = GalleryImage
        fields = ['gallery', 'title', 'image', 'caption', 'description', 'date_added', 'order']


class ContactForm(forms.ModelForm):
    # Hidden from people; bots fill every field they find.
    website = forms.CharField(required=False, widget=forms.HiddenInput)

    campus = forms.ModelChoiceField(
        queryset=Campus.objects.none(),
        required=False,
        label='Campus',
        empty_label='Select a campus (optional)',
        widget=forms.Select(attrs={'class': 'form-control', 'id': 'campus'}),
    )

    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'phone', 'campus', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'id': 'name', 'placeholder': 'Enter your full name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'id': 'email', 'placeholder': 'Enter your email address'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'id': 'phone', 'placeholder': 'Enter your phone number'}),
            'subject': forms.TextInput(attrs={'class': 'form-control', 'id': 'subject', 'placeholder': 'What is this regarding?'}),
            'message': forms.Textarea(attrs={'class': 'form-control', 'id': 'message', 'rows': 5, 'placeholder': 'Type your message here...'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Populated per-request so newly added/renamed campuses show up.
        self.fields['campus'].queryset = Campus.objects.filter(
            is_active=True
        ).order_by('name')
