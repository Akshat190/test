from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('gallery/', views.gallery, name='gallery'),
    path('contact/', views.contact, name='contact'),
    path('brief/', views.brief, name='brief'),
    path('aboutSchool/', views.aboutSchool, name='aboutSchool'),
    path('chandkheda/', views.chandkheda, name='chandkheda'),
    path('chattral/', views.chattral, name='chattral'),
    path('iffco/', views.iffco, name='iffco'),
    path('kadi/', views.kadi, name='kadi'),
    path('shela/', views.shela, name='shela'),
    path('success-stories/', views.success_stories, name='success_stories'),
    path('facilities/', views.facilities, name='facilities'),
    path('institutional-goals/', views.institutional_goals, name='institutional_goals'),
    path('our-team/', views.our_team, name='our_team'),
    path('team/', views.team, name='team'),
    path('activities/', views.activities, name='activities'),
    path('testimonials/', views.testimonials, name='testimonials'),
    path('achievements/', views.achievements, name='achievements'),
    path('health/', views.health_check, name='health_check'),
    # JSON API for the Astro frontend (proxied via nginx /api/).
    path('api/contact/', views.api_contact, name='api_contact'),
    path('api/carousel/', views.api_carousel, name='api_carousel'),
    path('api/celebrations/', views.api_celebrations, name='api_celebrations'),
    path('api/galleries/', views.api_galleries, name='api_galleries'),
    path('api/campuses/', views.api_campuses, name='api_campuses'),
]
