from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
import logging

from .models import (
    Celebration, Gallery, Campus, CarouselImage, Role, UserProfile,
    ContactSubmission,
)
import os
from .serializers import (
    CelebrationSerializer, GallerySerializer, CampusSerializer,
    CarouselImageSerializer, RoleSerializer, UserProfileSerializer,
)

logger = logging.getLogger('khschool')


class CarouselImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CarouselImage.objects.filter(is_active=True).order_by('order')
    serializer_class = CarouselImageSerializer


class CelebrationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Celebration.objects.all().order_by('-date')
    serializer_class = CelebrationSerializer
    filterset_fields = ['celebration_type', 'is_featured']

    def get_queryset(self):
        qs = Celebration.objects.all().order_by('-date')
        is_featured = self.request.query_params.get('is_featured')
        if is_featured and is_featured.lower() == 'true':
            qs = qs.filter(is_featured=True)
        return qs


class GalleryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Gallery.objects.all().order_by('-date_created')
    serializer_class = GallerySerializer
    filterset_fields = ['category', 'is_featured']

    def get_queryset(self):
        qs = Gallery.objects.all().order_by('-date_created')
        is_featured = self.request.query_params.get('is_featured')
        if is_featured and is_featured.lower() == 'true':
            qs = qs.filter(is_featured=True)
        return qs


class CampusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Campus.objects.filter(is_active=True).order_by('name')
    serializer_class = CampusSerializer
    lookup_field = 'slug'


class RoleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Role.objects.all().order_by('-level')
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAdminUser]


class UserProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAdminUser]


class ContactRateThrottle(AnonRateThrottle):
    scope = 'contact'


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@throttle_classes([ContactRateThrottle])
def contact_form(request):
    name = request.data.get('name', '').strip()
    email = request.data.get('email', '').strip()
    phone = request.data.get('phone', '').strip()
    subject = request.data.get('subject', '').strip()
    message = request.data.get('message', '').strip()

    if not all([name, email, subject, message]):
        return Response(
            {'error': 'Please fill in all required fields.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if '@' not in email or '.' not in email.split('@')[-1]:
        return Response(
            {'error': 'Please enter a valid email address.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    ContactSubmission.objects.create(
        name=name,
        email=email,
        phone=phone,
        subject=subject,
        message=message,
    )

    masked_email = email[0] + '***@' + email.split('@')[-1] if '@' in email else 'invalid'
    logger.info(f"Contact API submission: name={name}, email={masked_email}, subject={subject}")

    return Response({'success': True, 'message': 'Thank you for your message!'})


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def site_config(request):
    return Response({
        'site_name': 'Kapadia High School',
        'navigation': [
            {'label': 'Home', 'path': '/'},
            {'label': 'About Us', 'path': '/about', 'children': [
                {'label': 'About School', 'path': '/about'},
                {'label': 'Executive Brief', 'path': '/brief'},
                {'label': 'Institutional Goals', 'path': '/goals'},
            ]},
            {'label': 'Campuses', 'path': '/campuses', 'children': [
                {'label': 'Chandkheda', 'path': '/campuses/chandkheda'},
                {'label': 'Chhatral', 'path': '/campuses/chattral'},
                {'label': 'IFFCO', 'path': '/campuses/iffco'},
                {'label': 'Kadi', 'path': '/campuses/kadi'},
                {'label': 'Shela', 'path': '/campuses/shela'},
            ]},
            {'label': 'Gallery', 'path': '/gallery'},
            {'label': 'Facilities', 'path': '/facilities'},
            {'label': 'Activities', 'path': '/activities'},
            {'label': 'Our Team', 'path': '/team'},
            {'label': 'Contact', 'path': '/contact'},
        ],
        'social_links': {
            'facebook': os.environ.get('FACEBOOK_URL', ''),
            'instagram': os.environ.get('INSTAGRAM_URL', ''),
            'youtube': os.environ.get('YOUTUBE_URL', ''),
        },
    })
