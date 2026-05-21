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
    path('api/', include('khschool.api_urls')),
    path('', include('khschool.urls')),
]

# Prometheus metrics - staff-only access
from django.contrib.admin.views.decorators import staff_member_required
from django_prometheus import exports
urlpatterns += [
    path('metrics/', staff_member_required(exports.ExportToDjangoView), name='prometheus-metrics'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Custom error handlers
handler404 = 'khschool.views.handler404'
handler500 = 'khschool.views.handler500'

# Admin portal text
admin.site.site_header = "Kapadia High School"
admin.site.site_title = "Kapadia High School Admin Portal"
admin.site.index_title = "Welcome to Kapadia High School Portal"
