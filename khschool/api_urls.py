from django.urls import path

from . import api_views

urlpatterns = [
    path('carousel/', api_views.carousel, name='api_carousel'),
    path('celebrations/', api_views.celebrations, name='api_celebrations'),
    path('galleries/', api_views.galleries, name='api_galleries'),
    path('campuses/', api_views.campuses, name='api_campuses'),
    path('campus/<slug:slug>/', api_views.campus_detail, name='api_campus_detail'),
    path('config/', api_views.config, name='api_config'),
    path('contact/', api_views.contact, name='api_contact'),
]
