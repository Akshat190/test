from django import forms
from django.forms import ModelForm
from .models import (
    Celebration,
    CelebrationPhoto,
    CarouselImage,
    Gallery,
    GalleryImage,
)


class CelebrationForm(ModelForm):
    class Meta:
        model = Celebration
        fields = [
            "festivalname",
            "description",
            "celebration_type",
            "image",
            "date",
            "is_featured",
        ]


class CelebrationPhotoForm(ModelForm):
    class Meta:
        model = CelebrationPhoto
        fields = [
            "celebration",
            "photo",
            "caption",
            "order",
        ]


class CarouselImageForm(ModelForm):
    class Meta:
        model = CarouselImage
        fields = [
            "title",
            "subtitle",
            "image",
            "button_text",
            "button_link",
            "order",
            "is_active",
        ]


class GalleryForm(ModelForm):
    class Meta:
        model = Gallery
        fields = [
            "name",
            "description",
            "category",
            "thumbnail",
            "date_created",
            "is_featured",
        ]


class GalleryImageForm(ModelForm):
    class Meta:
        model = GalleryImage
        fields = [
            "gallery",
            "title",
            "image",
            "caption",
            "description",
            "date_added",
            "order",
        ]