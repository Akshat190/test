# Ubuntu VPS Deployment Guide - Kapadia High School Website

## Prerequisites
- Fresh Ubuntu 22.04 LTS VPS
- Root access
- Domain name (optional but recommended)

## Step 1: Initial Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y python3 python3-pip python3-venv nginx postgresql postgresql-contrib redis-server git curl ufw

# Create deployment user
sudo adduser deploy
sudo usermod -aG sudo deploy

# Switch to deploy user
sudo su - deploy
```

## Step 2: Setup PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE kapadiaschool_db;
CREATE USER kapadiaschool_user WITH PASSWORD 'your_secure_password_here';
ALTER ROLE kapadiaschool_user SET client_encoding TO 'utf8';
ALTER ROLE kapadiaschool_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE kapadiaschool_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE kapadiaschool_db TO kapadiaschool_user;
\q

# Test connection
psql -h localhost -U kapadiaschool_user -d kapadiaschool_db
```

## Step 3: Clone and Setup Project

```bash
# Clone your project
cd /home/deploy
git clone https://github.com/your-username/khs.git
cd khs

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn redis

# Create media directories for photo storage (matching Django models)
sudo mkdir -p /var/www/khs/media/carousel/images
sudo mkdir -p /var/www/khs/media/festival/gallery
sudo mkdir -p /var/www/khs/media/festival/images
sudo mkdir -p /var/www/khs/media/gallery/images
sudo mkdir -p /var/www/khs/media/gallery/thumbnails
sudo mkdir -p /var/www/khs/static
sudo chown -R deploy:www-data /var/www/khs
sudo chmod -R 755 /var/www/khs
```

## Step 4: Configure Django Settings for Production

Create production settings file:

```bash
# Create production settings
cat > kapadiaschool/settings_production.py << 'EOF'
from .settings import *
import os

DEBUG = False

ALLOWED_HOSTS = ['your-domain.com', 'www.your-domain.com', 'your-vps-ip']

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'kapadiaschool_db',
        'USER': 'kapadiaschool_user',
        'PASSWORD': 'your_secure_password_here',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Static and Media files
STATIC_URL = '/static/'
STATIC_ROOT = '/var/www/khs/static'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# Media files - match current settings
MEDIA_URL = '/gallery/'
MEDIA_ROOT = '/var/www/khs/media'

# Enable WhiteNoise for static files
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Security settings
SECRET_KEY = 'your-super-secret-key-here'
SECURE_SSL_REDIRECT = False  # Set True if using HTTPS
SECURE_HSTS_SECONDS = 31536000 if not DEBUG else 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = True if not DEBUG else False
SECURE_HSTS_PRELOAD = True if not DEBUG else False

# Cache with Redis
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}

# File upload settings for photos
FILE_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  # 10MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024   # 10MB

# VPS Photo storage settings (no Supabase needed)
USE_SUPABASE_STORAGE = False
PHOTO_MAX_SIZE = (1920, 1080)  # Max photo dimensions
THUMBNAIL_SIZE = (400, 300)    # Thumbnail size

# File upload limits
FILE_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  # 10MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024   # 10MB
EOF
```

## Step 5: Environment Variables

```bash
# Create environment file
cat > .env << 'EOF'
DJANGO_SETTINGS_MODULE=kapadiaschool.settings_production
DEBUG=False
SECRET_KEY=your-super-secret-key-here-generate-new-one
DATABASE_URL=postgresql://kapadiaschool_user:your_secure_password_here@localhost/kapadiaschool_db
ALLOWED_HOSTS=your-domain.com,www.your-domain.com,your-vps-ip
CRON_SECRET_KEY=your-cron-secret-key-here
# Note: Using VPS local storage - no Supabase needed
EOF

# Secure the env file
chmod 600 .env
```

## Step 6: Django Setup

```bash
# Activate virtual environment
source venv/bin/activate

# Set production environment (add to ~/.bashrc for persistence)
echo 'export DJANGO_SETTINGS_MODULE=kapadiaschool.settings_production' >> ~/.bashrc
source ~/.bashrc
export DJANGO_SETTINGS_MODULE=kapadiaschool.settings_production

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create superuser for admin
python manage.py createsuperuser

# Test the application
python manage.py runserver 0.0.0.0:8000
```

## Step 7: Gunicorn Configuration

```bash
# Test gunicorn
gunicorn --bind 0.0.0.0:8000 kapadiaschool.wsgi

# Create gunicorn service file
sudo tee /etc/systemd/system/gunicorn.service << 'EOF'
[Unit]
Description=gunicorn daemon for Kapadia School
Requires=gunicorn.socket
After=network.target

[Service]
Type=notify
User=deploy
Group=www-data
RuntimeDirectory=gunicorn
WorkingDirectory=/home/deploy/khs
ExecStart=/home/deploy/khs/venv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          kapadiaschool.wsgi:application
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

# Create socket file
sudo tee /etc/systemd/system/gunicorn.socket << 'EOF'
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock
SocketUser=www-data

[Install]
WantedBy=sockets.target
EOF

# Start and enable gunicorn
sudo systemctl daemon-reload
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
```

## Step 8: Nginx Configuration

```bash
# Create nginx config
sudo tee /etc/nginx/sites-available/kapadiaschool << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com your-vps-ip;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Static files
    location /static/ {
        alias /var/www/khs/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Media files (photos) - match Django MEDIA_URL
    location /gallery/ {
        alias /var/www/khs/media/;
        expires 7d;
        add_header Cache-Control "public";
        
        # Limit file size for uploads
        client_max_body_size 10M;
    }

    # Django application
    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Upload size limit
        client_max_body_size 10M;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/kapadiaschool /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx config
sudo nginx -t

# Start nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## Step 9: Firewall Setup

```bash
# Configure UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Step 10: SSL Certificate (Optional but Recommended)

```bash
# Install certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## Step 11: VPS Photo Storage Optimization

Since we're using VPS storage (no Supabase), let's optimize photo handling:

```bash
# Ensure management commands directory exists
mkdir -p khschool/management/commands

# Create advanced photo optimization command
cat > khschool/management/commands/optimize_photos.py << 'EOF'
from django.core.management.base import BaseCommand
from PIL import Image, ImageOps
import os
import time

class Command(BaseCommand):
    help = 'Optimize uploaded photos for VPS storage'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--folder',
            type=str,
            default='all',
            help='Specific folder to optimize (carousel, festival, gallery, or all)'
        )
    
    def handle(self, *args, **options):
        media_root = '/var/www/khs/media'
        folder = options['folder']
        
        if folder == 'all':
            target_dirs = [media_root]
        else:
            target_dirs = [os.path.join(media_root, folder)]
        
        total_processed = 0
        total_saved_bytes = 0
        
        for target_dir in target_dirs:
            if os.path.exists(target_dir):
                processed, saved = self.process_directory(target_dir)
                total_processed += processed
                total_saved_bytes += saved
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Optimization complete! '
                f'Processed {total_processed} images, '
                f'Saved {total_saved_bytes / 1024 / 1024:.2f} MB'
            )
        )
    
    def process_directory(self, directory):
        processed = 0
        saved_bytes = 0
        
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                    filepath = os.path.join(root, file)
                    original_size = os.path.getsize(filepath)
                    
                    if self.optimize_image(filepath):
                        new_size = os.path.getsize(filepath)
                        saved_bytes += original_size - new_size
                        processed += 1
        
        return processed, saved_bytes
    
    def optimize_image(self, filepath):
        try:
            original_size = os.path.getsize(filepath)
            
            with Image.open(filepath) as img:
                # Auto-rotate based on EXIF data
                img = ImageOps.exif_transpose(img)
                
                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'LA', 'P'):
                    bg = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    bg.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    img = bg
                
                # Different optimization based on folder
                if 'carousel' in filepath:
                    # Carousel images: 1920x600 max
                    max_size = (1920, 600)
                    quality = 90
                elif 'gallery' in filepath and 'thumbnails' in filepath:
                    # Thumbnails: 400x300 max
                    max_size = (400, 300)
                    quality = 80
                elif 'gallery' in filepath:
                    # Gallery images: 1200x800 max
                    max_size = (1200, 800)
                    quality = 85
                else:
                    # Festival and other images: 1024x768 max
                    max_size = (1024, 768)
                    quality = 85
                
                # Resize if too large
                if img.width > max_size[0] or img.height > max_size[1]:
                    img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # Save with optimization
                img.save(filepath, 'JPEG', quality=quality, optimize=True, progressive=True)
                
                new_size = os.path.getsize(filepath)
                saved_mb = (original_size - new_size) / 1024 / 1024
                
                if saved_mb > 0:
                    self.stdout.write(f'✓ {filepath} (saved {saved_mb:.2f}MB)')
                    return True
                else:
                    self.stdout.write(f'• {filepath} (already optimized)')
                    return False
                    
        except Exception as e:
            self.stderr.write(f'✗ Error optimizing {filepath}: {e}')
            return False
EOF
```

## Step 12: Backup Script

```bash
# Create backup script
cat > /home/deploy/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/deploy/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
pg_dump -h localhost -U kapadiaschool_user kapadiaschool_db > $BACKUP_DIR/db_backup_$DATE.sql

# Media files backup
tar -czf $BACKUP_DIR/media_backup_$DATE.tar.gz -C /var/www/khs media/

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /home/deploy/backup.sh

# Add to crontab (daily backup at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/deploy/backup.sh") | crontab -
```

## Step 13: Monitoring Script

```bash
# Create monitoring script
cat > /home/deploy/monitor.sh << 'EOF'
#!/bin/bash
# Check if services are running
if ! systemctl is-active --quiet gunicorn; then
    echo "Gunicorn is down, restarting..."
    sudo systemctl restart gunicorn
fi

if ! systemctl is-active --quiet nginx; then
    echo "Nginx is down, restarting..."
    sudo systemctl restart nginx
fi

if ! systemctl is-active --quiet postgresql; then
    echo "PostgreSQL is down, restarting..."
    sudo systemctl restart postgresql
fi

# Check disk usage
DISK_USAGE=$(df /var/www/khs | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "Disk usage is above 80%: $DISK_USAGE%"
fi
EOF

chmod +x /home/deploy/monitor.sh

# Add to crontab (check every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/deploy/monitor.sh") | crontab -
```

## Step 14: Deployment Script

```bash
# Create deployment script for updates
cat > /home/deploy/deploy.sh << 'EOF'
#!/bin/bash
cd /home/deploy/khs

echo "Pulling latest changes..."
git pull origin main

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing/updating dependencies..."
pip install -r requirements.txt

echo "Running migrations..."
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Optimizing photos..."
python manage.py optimize_photos

echo "Restarting services..."
sudo systemctl restart gunicorn
sudo systemctl reload nginx

echo "Deployment completed!"
EOF

chmod +x /home/deploy/deploy.sh
```

## Important Notes:

1. **Replace placeholders:**
   - `your-domain.com` with your actual domain
   - `your-vps-ip` with your VPS IP address
   - `your_secure_password_here` with a strong password
   - `your-super-secret-key-here` with Django secret key

2. **Photo storage:**
   - Photos stored in `/var/www/khs/media/`
   - Automatic optimization on upload
   - Nginx serves files directly (faster)
   - 10MB upload limit set

3. **Security:**
   - Firewall configured
   - SSL certificate setup
   - Security headers added
   - Environment variables secured

4. **Monitoring:**
   - Daily backups
   - Service monitoring
   - Disk usage alerts

## Quick Commands:

```bash
# View logs
sudo journalctl -u gunicorn
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Restart services
sudo systemctl restart gunicorn
sudo systemctl restart nginx

# Deploy updates
./deploy.sh

# Manual backup
./backup.sh
```

## VPS Storage Benefits:

### Why VPS Storage is Perfect for Your School Website:

✅ **Faster Loading**: Images served directly from your VPS (no external API calls)
✅ **Full Control**: Complete ownership of your photos and data
✅ **Cost Effective**: No additional cloud storage fees
✅ **Better SEO**: Faster image loading improves search rankings
✅ **Privacy**: All photos stay on your server
✅ **Unlimited Storage**: Only limited by your VPS disk space
✅ **Backup Control**: Photos included in your regular VPS backups

### Advanced VPS Photo Management:

```bash
# Optimize specific folder
python manage.py optimize_photos --folder carousel
python manage.py optimize_photos --folder gallery
python manage.py optimize_photos --folder festival

# Optimize all photos
python manage.py optimize_photos

# Check disk usage for media files
du -sh /var/www/khs/media/

# Find large images (>1MB)
find /var/www/khs/media/ -name "*.jpg" -size +1M -exec ls -lh {} \;
```

Your Django application will be accessible at `http://your-vps-ip` or `http://your-domain.com` with **superior VPS photo storage**!
