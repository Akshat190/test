from django.apps import AppConfig


class KhschoolConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'khschool'
    
    def ready(self):
        """Called when Django starts up.

        Scheduler/cron integration is disabled for VPS deployment.
        """
        # No automatic background scheduler; use OS-level cron if needed.
        pass
