from django.urls import path
from. import views
urlpatterns = [
    path('', views.home,name='home'),
    path('gallery/',views.gallery,name='gallery'),
    path('contact/',views.contact,name='contact'),
    path('brief/',views.brief,name='brief'),
    path('aboutSchool/',views.aboutSchool,name='aboutSchool'),
    path('chandkheda/',views.chandkheda,name='chandkheda'),
    path('chattral/',views.chattral,name='chattral'),
    path('iffco/',views.iffco,name='iffco'),
    path('kadi/',views.kadi,name='kadi'),
    path('shela/',views.shela,name='shela'),
    path('success-stories/',views.success_stories,name='success_stories'),
    path('facilities/',views.facilities,name='facilities'),
    path('institutional-goals/',views.institutional_goals,name='institutional_goals'),
    path('our-team/',views.our_team,name='our_team'),
    path('team/',views.team,name='team'),
    path('activities/',views.activities,name='activities'),
    path('testimonials/',views.testimonials,name='testimonials'),
    path('achievements/',views.achievements,name='achievements'),
    path('image-test/',views.image_test,name='image_test'),
    path('api/cron/', views.run_cron_job, name='run_cron_job'),
    path('health/', views.health_check, name='health_check'),
]

