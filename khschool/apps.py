from django.apps import AppConfig


class KhschoolConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'khschool'
    
    def ready(self):
        """Called when Django starts up"""
        import os
        # Only start scheduler in production or when explicitly enabled
        # Avoid starting it during migrations or management commands
        if os.environ.get('RUN_MAIN') or os.environ.get('RENDER'):
            from .scheduler import start_scheduler
            start_scheduler()
