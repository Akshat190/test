from django.core.management.base import BaseCommand
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Run scheduled tasks'

    def add_arguments(self, parser):
        parser.add_argument(
            '--task',
            type=str,
            help='Specific task to run (e.g., cleanup, backup, email)',
        )

    def handle(self, *args, **options):
        task = options.get('task')
        
        self.stdout.write(
            self.style.SUCCESS(f'Starting scheduled tasks at {timezone.now()}')
        )
        
        if task == 'cleanup' or not task:
            self.run_cleanup_task()
            
        if task == 'backup' or not task:
            self.run_backup_task()
            
        if task == 'email' or not task:
            self.run_email_task()
            
        if task == 'custom' or not task:
            self.run_custom_task()
        
        self.stdout.write(
            self.style.SUCCESS(f'Completed scheduled tasks at {timezone.now()}')
        )

    def run_cleanup_task(self):
        """Clean up old data"""
        self.stdout.write('Running cleanup task...')
        
        # Example: Clean up old sessions
        from django.contrib.sessions.models import Session
        expired_sessions = Session.objects.filter(expire_date__lt=timezone.now())
        count = expired_sessions.count()
        expired_sessions.delete()
        
        self.stdout.write(f'Cleaned up {count} expired sessions')

    def run_backup_task(self):
        """Backup important data"""
        self.stdout.write('Running backup task...')
        
        # Add your backup logic here
        # Example: Export data to CSV, sync to cloud storage, etc.
        
        self.stdout.write('Backup completed')

    def run_email_task(self):
        """Send scheduled emails"""
        self.stdout.write('Running email task...')
        
        # Example: Send daily newsletter, notifications, etc.
        from django.core.mail import send_mail
        from django.conf import settings
        
        # Uncomment and modify as needed:
        # send_mail(
        #     'Daily Report',
        #     'Your daily report is ready.',
        #     settings.DEFAULT_FROM_EMAIL,
        #     ['admin@example.com'],
        #     fail_silently=False,
        # )
        
        self.stdout.write('Email task completed')

    def run_custom_task(self):
        """Run your custom business logic"""
        self.stdout.write('Running custom task...')
        
        # Add your custom scheduled task logic here
        # Examples:
        # - Update statistics
        # - Process queued items
        # - Sync with external APIs
        # - Generate reports
        
        self.stdout.write('Custom task completed')
