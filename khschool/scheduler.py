import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django.conf import settings
import atexit

# Set up logging
logging.basicConfig()
logging.getLogger('apscheduler').setLevel(logging.DEBUG)

scheduler = BackgroundScheduler()

def sample_job():
    """
    Example cron job function
    Replace this with your actual task
    """
    print("Cron job executed successfully!")
    # Add your actual job logic here
    # Examples:
    # - Send emails
    # - Clean up old data
    # - Generate reports
    # - Sync with external APIs
    # - Backup data

def cleanup_old_data():
    """
    Example: Clean up old data
    """
    from .models import YourModel  # Replace with your actual model
    from django.utils import timezone
    from datetime import timedelta
    
    # Delete records older than 30 days
    # cutoff_date = timezone.now() - timedelta(days=30)
    # old_records = YourModel.objects.filter(created_at__lt=cutoff_date)
    # count = old_records.count()
    # old_records.delete()
    # print(f"Cleaned up {count} old records")

def send_daily_report():
    """
    Example: Send daily report
    """
    from django.core.mail import send_mail
    
    # Your email logic here
    print("Daily report sent!")

def start_scheduler():
    """
    Start the scheduler with your cron jobs
    """
    if scheduler.state == 0:  # Not started
        # Add your cron jobs here
        
        # Example: Run every minute (for testing)
        scheduler.add_job(
            sample_job,
            trigger=CronTrigger(minute='*'),  # Every minute
            id='sample_job',
            max_instances=1,
            replace_existing=True,
        )
        
        # Example: Run daily at 2 AM
        # scheduler.add_job(
        #     cleanup_old_data,
        #     trigger=CronTrigger(hour=2, minute=0),  # Daily at 2:00 AM
        #     id='daily_cleanup',
        #     max_instances=1,
        #     replace_existing=True,
        # )
        
        # Example: Run every Monday at 9 AM
        # scheduler.add_job(
        #     send_daily_report,
        #     trigger=CronTrigger(day_of_week='mon', hour=9, minute=0),
        #     id='weekly_report',
        #     max_instances=1,
        #     replace_existing=True,
        # )
        
        scheduler.start()
        
        # Shut down the scheduler when exiting the app
        atexit.register(lambda: scheduler.shutdown())
        
        print("Scheduler started successfully!")

def stop_scheduler():
    """
    Stop the scheduler
    """
    if scheduler.state == 1:  # Running
        scheduler.shutdown()
        print("Scheduler stopped!")
