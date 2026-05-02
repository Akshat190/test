from django.http import HttpResponse
from django.urls import reverse
from django.contrib.sitemaps import Sitemap
from .models import Celebration, Gallery


class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'weekly'

    def items(self):
        return [
            'home',
            'aboutSchool',
            'gallery',
            'contact',
            'brief',
            'chandkheda',
            'chattral',
            'iffco',
            'kadi',
            'shela',
            'success_stories',
            'facilities',
            'institutional_goals',
            'our_team',
            'team',
            'activities',
            'testimonials',
            'achievements',
        ]

    def location(self, item):
        return reverse(item)


class CelebrationSitemap(Sitemap):
    changefreq = 'monthly'
    priority = 0.6

    def items(self):
        return Celebration.objects.all()

    def lastmod(self, obj):
        return obj.date


class GallerySitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.6

    def items(self):
        return Gallery.objects.all()

    def lastmod(self, obj):
        return obj.date_created


def robots_txt(request):
    lines = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin/",
        "Disallow: /health/",
        "Sitemap: https://kapadiahighschool.com/sitemap.xml",
        "",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")
