from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import api_views

router = DefaultRouter()
router.register(r'carousel', api_views.CarouselImageViewSet)
router.register(r'celebrations', api_views.CelebrationViewSet)
router.register(r'galleries', api_views.GalleryViewSet)
router.register(r'campuses', api_views.CampusViewSet)
router.register(r'roles', api_views.RoleViewSet)
router.register(r'users', api_views.UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', api_views.contact_form, name='api-contact'),
    path('config/', api_views.site_config, name='api-config'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
