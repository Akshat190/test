from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
from khschool.models import Campus, CampusDocument
import os


class Command(BaseCommand):
    help = 'Seed initial campus data from existing static files'

    def handle(self, *args, **options):
        # Create Chattral campus
        campus, created = Campus.objects.get_or_create(
            slug='chattral',
            defaults={
                'name': 'Chhatral',
                'board': 'CBSE',
                'affiliation_number': '430302',
                'timings': '8:00 am to 2:00 pm (Monday-Saturday)',
                'is_active': True,
            }
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f'Created campus: {campus.name}'))
        else:
            self.stdout.write(self.style.WARNING(f'Campus already exists: {campus.name}'))

        # Try to attach the existing photo
        photo_path = os.path.join(settings.BASE_DIR, 'static', 'image', 'campus_chhatral.jpg')
        if os.path.exists(photo_path) and not campus.photo:
            with open(photo_path, 'rb') as f:
                campus.photo.save('campus_chhatral.jpg', File(f), save=True)
            self.stdout.write(self.style.SUCCESS(f'Attached photo: {photo_path}'))

        # Seed documents from existing static files
        documents = [
            ('1. Affiliation Letter 2026 to 2031.pdf', 'Affiliation Letter 2026-2031'),
            ('2. TRUST REGISTRATION CERTIFICATE.pdf', 'Trust Registration Certificate'),
            ('3. NOC CERTIFICATE-CBSE.pdf', 'NOC Certificate - CBSE'),
            ('4. RECOGNITION CERTIFICATE-1-5 & 6-8.pdf', 'Recognition Certificate (1-5 & 6-8)'),
            ('Building Safety Certificate.pdf', 'Building Safety Certificate'),
            ('fire-safety.pdf', 'Fire Safety Certificate'),
            ('Self Certificate (1).pdf', 'Self Certificate'),
            ('8. Water, Health and Sanitation Certificate.pdf', 'Water, Health & Sanitation'),
            ('9 fee structure.pdf', 'Fee Structure'),
            ('List of PTA.pdf', 'List of PTA'),
            ('List of SMC.pdf', 'List of SMC'),
            ('Results.pdf', 'Board Results'),
            ('academic_planner.pdf', 'Academic Planner'),
            ('Tentative Annual Academic Calendar.pdf', 'Annual Academic Calendar'),
            ('TENTATIVE HOLIDAY LIST & IMPORTANT EVENTS 2025-26.pdf', 'Holiday List & Events 2025-26'),
            ('Appendix IX.pdf', 'Mandatory Disclosure - Appendix IX'),
        ]

        docs_dir = os.path.join(settings.BASE_DIR, 'static', 'documents')
        for idx, (filename, title) in enumerate(documents, start=1):
            filepath = os.path.join(docs_dir, filename)
            if os.path.exists(filepath):
                doc, doc_created = CampusDocument.objects.get_or_create(
                    campus=campus,
                    title=title,
                    defaults={'order': idx}
                )
                if doc_created:
                    with open(filepath, 'rb') as f:
                        doc.file.save(filename, File(f), save=True)
                    self.stdout.write(self.style.SUCCESS(f'  Added document: {title}'))
                else:
                    self.stdout.write(self.style.WARNING(f'  Document exists: {title}'))
            else:
                self.stdout.write(self.style.WARNING(f'  File not found: {filename}'))

        self.stdout.write(self.style.SUCCESS('\nDone! You can now manage this campus via Django Admin.'))
        self.stdout.write(self.style.NOTICE('Create staff users and assign them to groups:'))
        self.stdout.write(self.style.NOTICE('  - "Photo Managers": can only change campus photos'))
        self.stdout.write(self.style.NOTICE('  - "Document Managers": can only change campus PDFs'))
        self.stdout.write(self.style.NOTICE('  - "Campus Managers": full access to both'))
