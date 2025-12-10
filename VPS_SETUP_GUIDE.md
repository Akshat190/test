# VPS Django Deployment Guide

## Current Issue: 502 Bad Gateway

The 502 error means nginx is running but can't connect to your Django app. Here's how to fix it:

## Step 1: Check if Django is Running

SSH into your VPS and check if your Django app is running:

```bash
# Check if gunicorn/uwsgi process is running
ps aux | grep python
ps aux | grep gunicorn
ps aux | grep uwsgi

# Check what's listening on ports
netstat -tlnp | grep :8000
netstat -tlnp | grep :80
```

## Step 2: Start Django Application

### Option A: Using Gunicorn (Recommended)

1. Navigate to your project directory:
```bash
cd /path/to/your/khs/project
```

2. Install gunicorn if not already installed:
```bash
pip install gunicorn
```

3. Start gunicorn:
```bash
# Test run (foreground)
gunicorn kapadiaschool.wsgi:application --bind 127.0.0.1:8000

# Background run
nohup gunicorn kapadiaschool.wsgi:application --bind 127.0.0.1:8000 &
```

### Option B: Using Django Development Server (Not for production)
```bash
python manage.py runserver 127.0.0.1:8000
```

## Step 3: Configure Nginx

Create/update nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/kapadiaschool
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name kapadiahighschool.com www.kapadiahighschool.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        root /path/to/your/khs/project;
    }
    
    location /gallery/ {
        root /path/to/your/khs/project;
    }

    location / {
        include proxy_params;
        proxy_pass http://127.0.0.1:8000;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/kapadiaschool /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 4: Create Systemd Service (For Production)

Create a service file to auto-start your Django app:

```bash
sudo nano /etc/systemd/system/kapadiaschool.service
```

Add this content:

```ini
[Unit]
Description=Kapadia School Django App
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/to/your/khs/project
Environment="PATH=/path/to/your/khs/project/venv/bin"
ExecStart=/path/to/your/khs/project/venv/bin/gunicorn --workers 3 --bind unix:/path/to/your/khs/project/kapadiaschool.sock kapadiaschool.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl start kapadiaschool
sudo systemctl enable kapadiaschool
sudo systemctl status kapadiaschool
```

## Step 5: Update Nginx for Socket Communication

Update nginx config to use socket:

```nginx
server {
    listen 80;
    server_name kapadiahighschool.com www.kapadiahighschool.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        root /path/to/your/khs/project;
    }
    
    location /gallery/ {
        root /path/to/your/khs/project;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/path/to/your/khs/project/kapadiaschool.sock;
    }
}
```

## Step 6: Set Up Static Files

```bash
cd /path/to/your/khs/project
python manage.py collectstatic --noinput
```

## Step 7: Set Up Database

```bash
python manage.py migrate
python manage.py createsuperuser
```

## Step 8: Set Proper Permissions

```bash
# Make sure www-data can read your files
sudo chown -R www-data:www-data /path/to/your/khs/project
sudo chmod -R 755 /path/to/your/khs/project
```

## Troubleshooting Commands

### Check logs:
```bash
# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Django/Gunicorn logs
sudo journalctl -u kapadiaschool -f

# System logs
sudo tail -f /var/log/syslog
```

### Test connections:
```bash
# Test if Django is responding
curl http://127.0.0.1:8000

# Test nginx config
sudo nginx -t

# Check port usage
netstat -tlnp | grep :80
netstat -tlnp | grep :8000
```

## Environment Variables Setup

Create a `.env` file in your project root:

```bash
nano /path/to/your/khs/project/.env
```

Add:
```env
DEBUG=False
SECRET_KEY=your-very-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
# OR for SQLite (simpler):
# DATABASE_URL=sqlite:///db.sqlite3
```

## Quick Fix Commands

If you need to restart everything:

```bash
# Restart Django service
sudo systemctl restart kapadiaschool

# Restart nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status kapadiaschool
sudo systemctl status nginx
```

## SSL Setup (Optional)

Install certbot for free SSL:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d kapadiahighschool.com -d www.kapadiahighschool.com
```

---

## What to do RIGHT NOW to fix 502:

1. SSH into your VPS
2. Run: `ps aux | grep python` - see if Django is running
3. If not running, go to your project folder and run: `gunicorn kapadiaschool.wsgi:application --bind 127.0.0.1:8000`
4. Test: `curl http://127.0.0.1:8000` - should return HTML
5. If that works, check nginx config and restart nginx

Let me know what you see from these commands!