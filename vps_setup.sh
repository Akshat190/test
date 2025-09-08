#!/bin/bash

# Kapadia High School VPS Setup Script
# Run this on your Ubuntu VPS as root

set -e

echo "=== Kapadia High School VPS Setup Started ==="

# Variables - CHANGE THESE
VPS_IP="YOUR_VPS_IP"
DOMAIN="your-domain.com"  # Optional, can be empty
DB_PASSWORD="KHS_secure_2024_DB"
DJANGO_SECRET="khs-django-secret-key-$(date +%s)-$(shuf -i 1000-9999 -n 1)"
ADMIN_USER="admin"
ADMIN_EMAIL="admin@kapadiaschool.com"
ADMIN_PASSWORD="admin123"

echo "Setting up with VPS IP: $VPS_IP"

# Step 1: System Update and Package Installation
echo "=== Step 1: Installing packages ==="
apt update && apt upgrade -y
apt install -y python3 python3-pip python3-venv nginx postgresql postgresql-contrib redis-server git curl ufw unzip

# Step 2: Create deploy user
echo "=== Step 2: Creating deploy user ==="
if ! id "deploy" &>/dev/null; then
    adduser --disabled-password --gecos "" deploy
    usermod -aG sudo deploy
    echo "deploy ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
fi

# Step 3: PostgreSQL Setup
echo "=== Step 3: Setting up PostgreSQL ==="
sudo -u postgres psql -c "DROP DATABASE IF EXISTS kapadiaschool_db;"
sudo -u postgres psql -c "DROP USER IF EXISTS kapadiaschool_user;"
sudo -u postgres psql -c "CREATE DATABASE kapadiaschool_db;"
sudo -u postgres psql -c "CREATE USER kapadiaschool_user WITH PASSWORD '$DB_PASSWORD';"
sudo -u postgres psql -c "ALTER ROLE kapadiaschool_user SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE kapadiaschool_user SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE kapadiaschool_user SET timezone TO 'UTC';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE kapadiaschool_db TO kapadiaschool_user;"

# Step 4: Create project directories
echo "=== Step 4: Creating directories ==="
mkdir -p /home/deploy/khs
mkdir -p /var/www/khs/media/carousel/images
mkdir -p /var/www/khs/media/festival/gallery
mkdir -p /var/www/khs/media/festival/images
mkdir -p /var/www/khs/static
chown -R deploy:www-data /var/www/khs
chmod -R 755 /var/www/khs
chown -R deploy:deploy /home/deploy

# Step 5: Wait for project files
echo "=== Step 5: Waiting for project files ==="
echo "Now you need to upload your project files to /home/deploy/khs/"
echo "You can use SCP, SFTP, or any file transfer method."
echo ""
echo "Example SCP command from your Windows machine:"
echo "scp -r C:\\Users\\Admin\\desktop\\khs\\* root@$VPS_IP:/home/deploy/khs/"
echo ""
echo "Or use WinSCP, FileZilla, or similar tool to upload all files from:"
echo "C:\\Users\\Admin\\desktop\\khs\\ to /home/deploy/khs/"
echo ""
read -p "Press Enter after you've uploaded all project files..."

# Verify files are uploaded
if [ ! -f "/home/deploy/khs/manage.py" ]; then
    echo "ERROR: Project files not found! Please upload them first."
    exit 1
fi

chown -R deploy:deploy /home/deploy/khs

# Step 6: Setup Python environment
echo "=== Step 6: Setting up Python environment ==="
cd /home/deploy/khs
sudo -u deploy python3 -m venv venv
sudo -u deploy /home/deploy/khs/venv/bin/pip install --upgrade pip
sudo -u deploy /home/deploy/khs/venv/bin/pip install -r requirements.txt
sudo -u deploy /home/deploy/khs/venv/bin/pip install gunicorn

# Step 7: Create production settings
echo "=== Step 7: Creating production settings ==="
cat > /home/deploy/khs/kapadiaschool/settings_production.py << EOF
from .settings import *
import os

DEBUG = False

ALLOWED_HOSTS = ['$VPS_IP', '$DOMAIN', 'www.$DOMAIN', 'localhost', '127.0.0.1']

# Remove empty entries
ALLOWED_HOSTS = [host for host in ALLOWED_HOSTS if host and host != 'www.']

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'kapadiaschool_db',
        'USER': 'kapadiaschool_user',
        'PASSWORD': '$DB_PASSWORD',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Static and Media files
STATIC_URL = '/static/'
STATIC_ROOT = '/var/www/khs/static'

MEDIA_URL = '/media/'
MEDIA_ROOT = '/var/www/khs/media'

# Security settings
SECRET_KEY = '$DJANGO_SECRET'
SECURE_SSL_REDIRECT = False
SECURE_HSTS_SECONDS = 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False

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

# Photo storage optimization
PHOTO_MAX_SIZE = (1920, 1080)
THUMBNAIL_SIZE = (400, 300)
EOF

# Step 8: Create environment file
echo "=== Step 8: Creating environment file ==="
cat > /home/deploy/khs/.env << EOF
DJANGO_SETTINGS_MODULE=kapadiaschool.settings_production
DEBUG=False
SECRET_KEY=$DJANGO_SECRET
DATABASE_URL=postgresql://kapadiaschool_user:$DB_PASSWORD@localhost/kapadiaschool_db
ALLOWED_HOSTS=$VPS_IP,$DOMAIN,www.$DOMAIN
EOF

chown deploy:deploy /home/deploy/khs/.env
chmod 600 /home/deploy/khs/.env

# Step 9: Django setup
echo "=== Step 9: Setting up Django ==="
cd /home/deploy/khs
export DJANGO_SETTINGS_MODULE=kapadiaschool.settings_production

sudo -u deploy /home/deploy/khs/venv/bin/python manage.py migrate
sudo -u deploy /home/deploy/khs/venv/bin/python manage.py collectstatic --noinput

# Create superuser non-interactively
sudo -u deploy /home/deploy/khs/venv/bin/python manage.py shell << EOF
from django.contrib.auth.models import User
if not User.objects.filter(username='$ADMIN_USER').exists():
    User.objects.create_superuser('$ADMIN_USER', '$ADMIN_EMAIL', '$ADMIN_PASSWORD')
    print('Superuser created successfully')
else:
    print('Superuser already exists')
EOF

# Step 10: Copy existing photos
echo "=== Step 10: Copying existing photos ==="
if [ -d "/home/deploy/khs/gallery" ]; then
    cp -r /home/deploy/khs/gallery/* /var/www/khs/media/ 2>/dev/null || true
    chown -R deploy:www-data /var/www/khs/media
fi

if [ -d "/home/deploy/khs/static/images" ]; then
    cp -r /home/deploy/khs/static/images/* /var/www/khs/media/ 2>/dev/null || true
    chown -R deploy:www-data /var/www/khs/media
fi

# Step 11: Create photo optimization command
echo "=== Step 11: Creating photo optimization ==="
mkdir -p /home/deploy/khs/khschool/management/commands
cat > /home/deploy/khs/khschool/management/commands/optimize_photos.py << 'EOF'
from django.core.management.base import BaseCommand
from PIL import Image
import os

class Command(BaseCommand):
    help = 'Optimize uploaded photos'
    
    def handle(self, *args, **options):
        media_root = '/var/www/khs/media'
        for root, dirs, files in os.walk(media_root):
            for file in files:
                if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                    filepath = os.path.join(root, file)
                    self.optimize_image(filepath)
    
    def optimize_image(self, filepath):
        try:
            with Image.open(filepath) as img:
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                
                if img.width > 1920 or img.height > 1080:
                    img.thumbnail((1920, 1080), Image.Resampling.LANCZOS)
                
                img.save(filepath, 'JPEG', quality=85, optimize=True)
                self.stdout.write(f'Optimized: {filepath}')
        except Exception as e:
            self.stderr.write(f'Error optimizing {filepath}: {e}')
EOF

chown -R deploy:deploy /home/deploy/khs/khschool/management

# Step 12: Gunicorn service
echo "=== Step 12: Setting up Gunicorn ==="
cat > /etc/systemd/system/gunicorn.service << 'EOF'
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

cat > /etc/systemd/system/gunicorn.socket << 'EOF'
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock
SocketUser=www-data

[Install]
WantedBy=sockets.target
EOF

systemctl daemon-reload
systemctl start gunicorn.socket
systemctl enable gunicorn.socket

# Step 13: Nginx configuration
echo "=== Step 13: Setting up Nginx ==="
cat > /etc/nginx/sites-available/kapadiaschool << EOF
server {
    listen 80;
    server_name $VPS_IP $DOMAIN www.$DOMAIN;

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

    # Media files (photos)
    location /media/ {
        alias /var/www/khs/media/;
        expires 7d;
        add_header Cache-Control "public";
        client_max_body_size 10M;
    }

    # Django application
    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        client_max_body_size 10M;
    }
}
EOF

ln -sf /etc/nginx/sites-available/kapadiaschool /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl restart nginx
systemctl enable nginx

# Step 14: Firewall setup
echo "=== Step 14: Setting up firewall ==="
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Step 15: Create management scripts
echo "=== Step 15: Creating management scripts ==="

# Backup script
cat > /home/deploy/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/deploy/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

PGPASSWORD="$DB_PASSWORD" pg_dump -h localhost -U kapadiaschool_user kapadiaschool_db > $BACKUP_DIR/db_backup_$DATE.sql
tar -czf $BACKUP_DIR/media_backup_$DATE.tar.gz -C /var/www/khs media/

find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

# Monitor script
cat > /home/deploy/monitor.sh << 'EOF'
#!/bin/bash
if ! systemctl is-active --quiet gunicorn; then
    systemctl restart gunicorn
fi

if ! systemctl is-active --quiet nginx; then
    systemctl restart nginx
fi

if ! systemctl is-active --quiet postgresql; then
    systemctl restart postgresql
fi

DISK_USAGE=$(df /var/www/khs | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "Disk usage warning: $DISK_USAGE%"
fi
EOF

# Deploy script
cat > /home/deploy/deploy.sh << EOF
#!/bin/bash
cd /home/deploy/khs

echo "Activating virtual environment..."
source venv/bin/activate

echo "Running migrations..."
export DJANGO_SETTINGS_MODULE=kapadiaschool.settings_production
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Optimizing photos..."
python manage.py optimize_photos

echo "Restarting services..."
systemctl restart gunicorn
systemctl reload nginx

echo "Deployment completed!"
EOF

chmod +x /home/deploy/*.sh
chown deploy:deploy /home/deploy/*.sh

# Set up crontab for deploy user
sudo -u deploy crontab -l 2>/dev/null | { cat; echo "0 2 * * * /home/deploy/backup.sh"; echo "*/5 * * * * /home/deploy/monitor.sh"; } | sudo -u deploy crontab -

# Step 16: Final setup
echo "=== Step 16: Final setup and testing ==="
systemctl restart gunicorn
systemctl restart nginx

# Wait for services to start
sleep 5

# Test the application
if curl -f http://localhost/ > /dev/null 2>&1; then
    echo "✅ Application is running successfully!"
else
    echo "⚠️ Application might have issues. Check logs:"
    echo "sudo journalctl -u gunicorn -f"
    echo "sudo tail -f /var/log/nginx/error.log"
fi

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "🎉 Your Kapadia High School website is now running!"
echo ""
echo "📍 Access your website at:"
echo "   http://$VPS_IP"
if [ -n "$DOMAIN" ] && [ "$DOMAIN" != "your-domain.com" ]; then
    echo "   http://$DOMAIN"
fi
echo ""
echo "👨‍💼 Admin Panel:"
echo "   http://$VPS_IP/admin/"
echo "   Username: $ADMIN_USER"
echo "   Password: $ADMIN_PASSWORD"
echo ""
echo "📁 Important Directories:"
echo "   Project: /home/deploy/khs/"
echo "   Photos: /var/www/khs/media/"
echo "   Static: /var/www/khs/static/"
echo ""
echo "🔧 Management Commands:"
echo "   Deploy updates: ./deploy.sh"
echo "   Backup: ./backup.sh"
echo "   View logs: sudo journalctl -u gunicorn -f"
echo ""
echo "🔒 Security Notes:"
echo "   - Change admin password immediately"
echo "   - Database password: $DB_PASSWORD"
echo "   - All services are running and monitored"
echo ""
echo "📸 Photo Storage:"
echo "   - Upload limit: 10MB per file"
echo "   - Auto-optimization enabled"
echo "   - Daily backups configured"
echo ""

if [ -n "$DOMAIN" ] && [ "$DOMAIN" != "your-domain.com" ]; then
    echo "🔐 To enable HTTPS:"
    echo "   sudo apt install certbot python3-certbot-nginx"
    echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
fi

echo ""
echo "=== Setup Completed Successfully! ==="
