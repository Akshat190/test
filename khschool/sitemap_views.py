from django.http import HttpResponse
from django.urls import reverse
from django.contrib.sitemaps import Sitemap


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


# Celebrations and galleries have no standalone detail URLs on this site:
# they render inline on the home and gallery pages. An earlier version
# listed them as sitemap entries and called obj.get_absolute_url(), which
# neither model defines, so /sitemap.xml returned HTTP 500 on any site
# with content. The pages that actually display them are already covered
# by StaticViewSitemap above.


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
