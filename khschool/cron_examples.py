# APScheduler 15-minute interval examples

# Method 1: Using CronTrigger with minute='*/15'
# This runs at: 00, 15, 30, 45 minutes past every hour
scheduler.add_job(
    your_function,
    trigger=CronTrigger(minute='*/15'),
    id='every_15_minutes_cron',
    max_instances=1,
    replace_existing=True,
)

# Method 2: Using IntervalTrigger 
# This runs every 15 minutes from when the scheduler starts
from apscheduler.triggers.interval import IntervalTrigger
scheduler.add_job(
    your_function,
    trigger=IntervalTrigger(minutes=15),
    id='every_15_minutes_interval',
    max_instances=1,
    replace_existing=True,
)

# Method 3: Specific times every hour (0, 15, 30, 45 minutes)
scheduler.add_job(
    your_function,
    trigger=CronTrigger(minute='0,15,30,45'),
    id='quarter_hourly',
    max_instances=1,
    replace_existing=True,
)

# Method 4: Every 15 minutes but only during business hours (9 AM - 5 PM)
scheduler.add_job(
    your_function,
    trigger=CronTrigger(minute='*/15', hour='9-17'),
    id='business_hours_15min',
    max_instances=1,
    replace_existing=True,
)

# Method 5: Every 15 minutes but only on weekdays
scheduler.add_job(
    your_function,
    trigger=CronTrigger(minute='*/15', day_of_week='mon-fri'),
    id='weekdays_15min',
    max_instances=1,
    replace_existing=True,
)

# Method 6: Every 15 minutes starting at a specific time (e.g., 5 minutes past the hour)
scheduler.add_job(
    your_function,
    trigger=CronTrigger(minute='5,20,35,50'),
    id='offset_15min',
    max_instances=1,
    replace_existing=True,
)
