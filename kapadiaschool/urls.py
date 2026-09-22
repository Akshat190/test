"""
URL configuration for kapadiaschool project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.sitemaps.views import sitemap
from khschool.sitemap_views import (
    robots_txt,
    StaticViewSitemap,
    CelebrationSitemap,
    GallerySitemap,
)

sitemaps = {
    'static': StaticViewSitemap,
    'celebrations': CelebrationSitemap,
    'galleries': GallerySitemap,
}

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('robots.txt', robots_txt, name='robots_txt'),
    path('', include('khschool.urls')),
]

# Prometheus metrics - staff-only access
from django.contrib.admin.views.decorators import staff_member_required
from django_prometheus import exports
urlpatterns += [
    path('metrics/', staff_member_required(exports.ExportToDjangoView), name='prometheus-metrics'),
]

# Dev helper: serves /media/ only when DEBUG=True (no-op otherwise).
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Production-safe media serving: Django never serves user uploads itself
# when DEBUG=False, and this VPS runs gunicorn without an nginx media
# alias — so serve MEDIA_ROOT explicitly in both modes.
# (For high traffic, move this to nginx / object storage instead.)
from django.views.static import serve as _media_serve
from django.urls import re_path as _re_path
urlpatterns += [
    _re_path(r'^media/(?P<path>.*)$', _media_serve, {'document_root': settings.MEDIA_ROOT}),
]

# Custom error handlers
handler404 = 'khschool.views.handler404'
handler500 = 'khschool.views.handler500'

# Admin portal text
admin.site.site_header = "Kapadia High School"
admin.site.site_title = "Kapadia High School Admin Portal"
admin.site.index_title = "Welcome to Kapadia High School Portal"
