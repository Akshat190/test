"""
Scheduler module for background tasks in the Kapadia High School website.
Uses APScheduler for running periodic tasks like cleanup, maintenance, and keep-alive.
"""

import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
import atexit

# Create a single scheduler instance
scheduler = BackgroundScheduler()

# Set up logging
logger = logging.getLogger(__name__)

def every_15_minutes_task():
    """
    Example task that runs every 15 minutes.
    Performs maintenance tasks and generates activity to keep services responsive.
    """
    try:
        from django.utils import timezone
        current_time = timezone.now()
        print(f"🚀 Starting 15-minute maintenance task at {current_time.strftime('%H:%M:%S')}")
        
        # Example 1: Clean up expired sessions
        from django.contrib.sessions.models import Session
        expired_count = Session.objects.filter(expire_date__lt=current_time).count()
        if expired_count > 0:
            Session.objects.filter(expire_date__lt=current_time).delete()
            print(f"   ✅ Cleaned {expired_count} expired sessions")
        else:
            print(f"   ℹ️ No expired sessions to clean")
        
        # Example 2: Log system status (generates DB activity)
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
        print(f"   📊 Database connection check: {'✅ OK' if result else '❌ Failed'}")
        
        # Log memory usage (generates system activity)
        import psutil
        memory_percent = psutil.virtual_memory().percent
        print(f"   💾 Memory usage: {memory_percent:.1f}%")
        
        print(f"   🚀 Maintenance task completed at {current_time.strftime('%H:%M:%S')}")
        
    except Exception as e:
        logger.error(f"Error in 15-minute task: {str(e)}")
        print(f"   ❌ Error in 15-minute task: {str(e)}")

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
        
        # Run every 15 minutes: at 00, 15, 30, 45 minutes past each hour
        scheduler.add_job(
            every_15_minutes_task,
            trigger=CronTrigger(minute='*/15'),  # Every 15 minutes
            id='every_15_minutes_maintenance',
            max_instances=1,
            replace_existing=True,
        )
        
        # Alternative way using interval trigger (also every 15 minutes)
        # from apscheduler.triggers.interval import IntervalTrigger
        # scheduler.add_job(
        #     sample_job,
        #     trigger=IntervalTrigger(minutes=15),
        #     id='sample_job_interval',
        #     max_instances=1,
        #     replace_existing=True,
        # )
        
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