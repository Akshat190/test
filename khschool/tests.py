from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import UserProfile, ContactSubmission


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


class ApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_carousel(self):
        response = self.client.get('/api/carousel/')
        self.assertEqual(response.status_code, 200)

    def test_api_celebrations(self):
        response = self.client.get('/api/celebrations/')
        self.assertEqual(response.status_code, 200)

    def test_api_galleries(self):
        response = self.client.get('/api/galleries/')
        self.assertEqual(response.status_code, 200)

    def test_api_campuses(self):
        response = self.client.get('/api/campuses/')
        self.assertEqual(response.status_code, 200)

    def test_api_config(self):
        response = self.client.get('/api/config/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('site_name', response.data)

    def test_api_contact_post_valid(self):
        response = self.client.post('/api/contact/', {
            'name': 'Test User',
            'email': 'test@example.com',
            'phone': '1234567890',
            'subject': 'Test Subject',
            'message': 'Test message body',
        }, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['success'])
        self.assertEqual(ContactSubmission.objects.count(), 1)

    def test_api_contact_post_invalid(self):
        response = self.client.post('/api/contact/', {
            'name': '',
            'email': 'bad',
            'subject': '',
            'message': '',
        }, format='json')
        self.assertEqual(response.status_code, 400)

    def test_api_roles_admin_required(self):
        response = self.client.get('/api/roles/')
        self.assertEqual(response.status_code, 403)

    def test_api_users_admin_required(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 403)


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
