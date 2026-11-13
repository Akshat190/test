"""Campus fallback content, shared by the Django pages and the JSON API.

Every field falls back to the hardcoded value when the admin has not filled
it in, so all five campus pages work with an empty database.
"""

CAMPUS_DEFAULTS = {
    'chandkheda': {
        'name': 'Chandkheda', 'board': 'GSEB',
        'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
        'hero_image': 'image/campus_chandkheda.jpg',
    },
    'chattral': {
        'name': 'Chhatral', 'board': 'CBSE', 'affiliation_number': '430302',
        'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
        'hero_image': 'image/campus_chhatral.jpg',
    },
    'iffco': {
        'name': 'IFFCO Township', 'board': 'GSEB',
        'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
        'hero_image': 'image/campus_iffco.jpg',
    },
    'kadi': {
        'name': 'Kadi', 'board': 'GSEB',
        'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
        'hero_image': '',
    },
    'shela': {
        'name': 'Shela',
        'affiliation_label': 'Contact number', 'affiliation_number': '6356000941/42',
        'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
        'address': 'Nr. Anand Elegance, Nr. Mahadev Elegance, VIP Road, Shela, Ahmedabad - 380057',
        'hero_image': 'image/Shela-school-image.jpeg',
    },
}


def find_campus(slug):
    """Resolve a route slug (``chattral``) to its Campus row.

    Rows store the display name as the slug (``Chhatral``), and IFFCO is
    stored as ``IFFCO-Township``, so a plain slug lookup misses them.
    """
    from .models import Campus

    campus = Campus.objects.filter(slug__iexact=slug, is_active=True).first()
    if campus is not None:
        return campus
    name = CAMPUS_DEFAULTS.get(slug, {}).get('name')
    if not name:
        return None
    return Campus.objects.filter(name__iexact=name, is_active=True).first()


def campus_info(slug, campus):
    defaults = CAMPUS_DEFAULTS[slug]

    def field(name):
        value = getattr(campus, name, '') if campus else ''
        if isinstance(value, str):
            value = value.strip()
        return value or defaults.get(name, '')

    return {
        'name': field('name') or defaults['name'],
        'board': field('board') or defaults.get('board', ''),
        'timings': field('timings') or defaults.get('timings', ''),
        'affiliation_label': defaults.get('affiliation_label', 'Affiliation number'),
        'affiliation_number': field('affiliation_number') or defaults.get('affiliation_number', ''),
        'address': field('address') or defaults.get('address', ''),
        'hero_image': defaults['hero_image'],
        'photo_url': campus.get_photo_url() if campus else None,
    }
