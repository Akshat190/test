import json
from django.core import mail
from django.test import TestCase, Client, override_settings
from django.urls import reverse
from django.contrib.auth.models import User
from django.utils import timezone
from .models import UserProfile, ContactSubmission, Campus, Celebration, Gallery, CarouselImage


class BasicViewTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_home_page(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)

    def test_gallery_page(self):
        response = self.client.get(reverse('gallery'))
        self.assertEqual(response.status_code, 200)

    def test_contact_page_get(self):
        response = self.client.get(reverse('contact'))
        self.assertEqual(response.status_code, 200)

    def test_about_page(self):
        response = self.client.get(reverse('aboutSchool'))
        self.assertEqual(response.status_code, 200)

    def test_health_check(self):
        response = self.client.get(reverse('health_check'))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['status'], 'healthy')

    def test_contact_page_post_valid(self):
        response = self.client.post(reverse('contact'), {
            'name': 'Test User',
            'email': 'test@example.com',
            'phone': '1234567890',
            'subject': 'Test Subject',
            'message': 'Test message body',
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(ContactSubmission.objects.count(), 1)

    def test_contact_page_post_invalid(self):
        response = self.client.post(reverse('contact'), {
            'name': '',
            'email': 'bad',
            'subject': '',
            'message': '',
        })
        self.assertEqual(response.status_code, 200)

    def test_error_404(self):
        response = self.client.get('/nonexistent-page/')
        self.assertEqual(response.status_code, 404)

    def test_multiple_campus_pages(self):
        for slug in ['chandkheda', 'chattral', 'iffco', 'kadi', 'shela']:
            response = self.client.get(reverse(slug))
            self.assertEqual(response.status_code, 200)


class ModelTests(TestCase):
    def test_contact_submission_str(self):
        submission = ContactSubmission.objects.create(
            name='Test',
            email='test@example.com',
            subject='Hello',
            message='World',
        )
        self.assertEqual(str(submission), 'Test - Hello')

    def test_user_profile_creation_signal(self):
        user = User.objects.create(username='testuser_nopw')
        self.assertTrue(hasattr(user, 'profile'))
        self.assertIsInstance(user.profile, UserProfile)


class SiteMapTests(TestCase):
    def test_sitemap_xml(self):
        response = self.client.get('/sitemap.xml')
        self.assertEqual(response.status_code, 200)

    def test_sitemap_with_content(self):
        """Regression: /sitemap.xml used to 500 once any Celebration or
        Gallery existed, because the sitemap called get_absolute_url()
        which neither model defines. An empty test DB hid it, so this
        test deliberately creates content first."""
        from django.utils import timezone
        from .models import Celebration, Gallery
        Celebration.objects.create(festivalname='Sitemap Regression',
                                   date=timezone.now())
        Gallery.objects.create(name='Sitemap Regression Gallery',
                               category='event')
        response = self.client.get('/sitemap.xml')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, '<loc>')

    def test_robots_txt(self):
        response = self.client.get('/robots.txt')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Disallow')


class ApiTests(TestCase):
    """The Next.js frontend reads these four lists and posts the contact form."""

    def setUp(self):
        self.campus = Campus.objects.create(
            slug='chattral', name='Chhatral', board='CBSE',
            affiliation_number='430302', timings='8:00 am to 2:00 pm',
        )
        self.gallery = Gallery.objects.create(name='Sports Day', category='sports')
        self.celebration = Celebration.objects.create(
            festivalname='Diwali', date=timezone.now(), campus=self.campus,
        )
        CarouselImage.objects.create(title='Slide', order=1)

    def test_list_endpoints_return_json_arrays(self):
        for path in ('/api/carousel/', '/api/celebrations/', '/api/galleries/', '/api/campuses/'):
            response = self.client.get(path)
            self.assertEqual(response.status_code, 200, path)
            self.assertIsInstance(response.json(), list, path)

    def test_content_shapes(self):
        celebration = self.client.get('/api/celebrations/').json()[0]
        self.assertEqual(celebration['festivalname'], 'Diwali')
        self.assertEqual(celebration['campus']['slug'], 'chattral')
        self.assertEqual(celebration['photo_count'], 0)

        gallery = self.client.get('/api/galleries/').json()[0]
        self.assertEqual(gallery['name'], 'Sports Day')
        self.assertEqual(gallery['image_count'], 0)

        campus = self.client.get('/api/campuses/').json()[0]
        self.assertEqual(campus['slug'], 'chattral')
        self.assertEqual(campus['documents'], [])

    def test_contact_post_saves_and_links_campus(self):
        response = self.client.post(
            '/api/contact/',
            data=json.dumps({
                'name': 'Test Parent',
                'email': 'parent@example.com',
                'phone': '1234567890',
                'campus': self.campus.id,
                'subject': 'Admission',
                'message': 'Please share the fee structure.',
            }),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)
        submission = ContactSubmission.objects.get()
        self.assertEqual(submission.campus, self.campus)

    def test_contact_post_rejects_incomplete_payload(self):
        response = self.client.post(
            '/api/contact/',
            data=json.dumps({'name': '', 'email': 'bad'}),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 400)
        errors = response.json()['errors']
        self.assertIn('email', errors)
        self.assertIn('message', errors)
        self.assertEqual(ContactSubmission.objects.count(), 0)

    def test_contact_post_honeypot_silently_drops(self):
        response = self.client.post(
            '/api/contact/',
            data=json.dumps({
                'name': 'Spam Bot',
                'email': 'bot@example.com',
                'subject': 'Buy pills',
                'message': 'Cheap offers',
                'website': 'https://spam.example',
            }),
            content_type='application/json',
        )
        # Bots get a success answer so they do not retry, but nothing is stored.
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['ok'])
        self.assertEqual(ContactSubmission.objects.count(), 0)

    @override_settings(
        EMAIL_HOST='smtp.example.com',
        CONTACT_NOTIFY_EMAIL='office@example.com',
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
    )
    def test_contact_post_emails_the_office(self):
        response = self.client.post(
            '/api/contact/',
            data=json.dumps({
                'name': 'Test Parent',
                'email': 'parent@example.com',
                'subject': 'Admission',
                'message': 'Please share the fee structure.',
            }),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(mail.outbox), 1)
        sent = mail.outbox[0]
        self.assertEqual(sent.to, ['office@example.com'])
        self.assertEqual(sent.reply_to, ['parent@example.com'])
        self.assertIn('Admission', sent.subject)

    def test_campus_detail_merges_admin_fields_and_defaults(self):
        response = self.client.get('/api/campus/chattral/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['board'], 'CBSE')
        self.assertEqual(data['affiliation_number'], '430302')
        self.assertEqual(data['documents'], [])

        fallback = self.client.get('/api/campus/shela/').json()
        self.assertEqual(fallback['name'], 'Shela')
        self.assertEqual(fallback['affiliation_label'], 'Contact number')
        self.assertEqual(fallback['hero_image'], 'image/Shela-school-image.jpeg')
        self.assertIn('Anand Elegance', fallback['address'])

        self.assertEqual(self.client.get('/api/campus/unknown/').status_code, 404)

    def test_campus_address_from_admin(self):
        self.campus.address = 'Station Road, Chhatral'
        self.campus.save()
        detail = self.client.get('/api/campus/chattral/').json()
        self.assertEqual(detail['address'], 'Station Road, Chhatral')
        listed = self.client.get('/api/campuses/').json()[0]
        self.assertEqual(listed['address'], 'Station Road, Chhatral')

    def test_config_lists_category_and_type_choices(self):
        data = self.client.get('/api/config/').json()
        categories = [item['value'] for item in data['gallery_categories']]
        types = [item['value'] for item in data['celebration_types']]
        self.assertIn('sports', categories)
        self.assertIn('festival', types)
        self.assertEqual(len(categories), len(Gallery.CATEGORY_CHOICES))

    def test_contact_get_is_not_allowed(self):
        self.assertEqual(self.client.get('/api/contact/').status_code, 405)
