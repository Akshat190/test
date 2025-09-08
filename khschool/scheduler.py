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
    from django.utils import timezone
    print(f"15-minute cron job executed at {timezone.now()}")
    # Add your actual job logic here
    # Examples:
    # - Send emails
    # - Clean up old data
    # - Generate reports
    # - Sync with external APIs
    # - Backup data

def every_15_minutes_task():
    """
    Keep-alive task for Render deployment - prevents service from sleeping
    This runs every 15 minutes: at 00, 15, 30, 45 minutes past each hour
    """
    from django.utils import timezone
    import logging
    
    logger = logging.getLogger(__name__)
    current_time = timezone.now()
    
    print(f"🕐 Keep-alive task running at {current_time.strftime('%Y-%m-%d %H:%M:%S')}")
    logger.info(f"Keep-alive scheduled task executed at {current_time}")
    
    try:
        # Keep-alive activity to prevent Render from sleeping
        import requests
        from django.conf import settings
        
        # Ping your own service to generate activity (optional - only if you have the URL)
        # Replace with your actual Render URL when deployed
        # try:
        #     response = requests.get('https://your-app-name.onrender.com/health/', timeout=10)
        #     print(f"   🏓 Self-ping successful: {response.status_code}")
        # except Exception as ping_error:
        #     print(f"   ⚠️ Self-ping failed: {ping_error}")
        
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
        
        print(f"   🚀 Keep-alive task completed at {current_time.strftime('%H:%M:%S')}")
        
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
        
        # Run every 15 minutes: at 00, 15, 30, 45 minutes past each hour (keeps Render service awake)
        scheduler.add_job(
            every_15_minutes_task,
            trigger=CronTrigger(minute='*/15'),  # Every 15 minutes
            id='every_15_minutes_keepalive',
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
