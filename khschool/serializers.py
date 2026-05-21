from rest_framework import serializers
from .models import (
    Celebration, CelebrationPhoto, Gallery, GalleryImage,
    Campus, CampusDocument, CarouselImage, Role, UserProfile,
)


class CelebrationPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CelebrationPhoto
        fields = ['id', 'photo', 'get_photo_url', 'caption', 'order']


class CelebrationSerializer(serializers.ModelSerializer):
    photos = CelebrationPhotoSerializer(source='celebrationphoto_set', many=True, read_only=True)
    photo_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Celebration
        fields = [
            'id', 'festivalname', 'description', 'celebration_type',
            'image', 'get_image_url', 'date', 'is_featured',
            'photos', 'photo_count',
        ]


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'image', 'get_image_url', 'caption', 'description', 'date_added', 'order']


class GallerySerializer(serializers.ModelSerializer):
    images = GalleryImageSerializer(source='galleryimage_set', many=True, read_only=True)
    image_count = serializers.IntegerField(read_only=True)
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Gallery
        fields = [
            'id', 'name', 'description', 'category',
            'thumbnail', 'thumbnail_url', 'date_created',
            'is_featured', 'images', 'image_count',
        ]

    def get_thumbnail_url(self, obj):
        return obj.get_thumbnail_url()


class CampusDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampusDocument
        fields = ['id', 'title', 'file', 'get_file_url', 'order']


class CampusSerializer(serializers.ModelSerializer):
    documents = CampusDocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Campus
        fields = [
            'id', 'slug', 'name', 'board', 'affiliation_number',
            'timings', 'photo', 'get_photo_url', 'is_active', 'documents',
        ]


class CarouselImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselImage
        fields = [
            'id', 'title', 'subtitle', 'image', 'get_image_url',
            'button_text', 'button_link', 'order', 'is_active',
        ]


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = [
            'id', 'name', 'display_name', 'level',
            'can_change_photo', 'can_change_documents',
            'can_manage_users', 'can_manage_roles', 'is_super_admin',
        ]


class UserProfileSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'role', 'created_at', 'updated_at']
