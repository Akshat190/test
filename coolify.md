VPS Setup Steps

1. Install Coolify

curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
Open http://YOUR_VPS_IP:8000 in browser, create admin account.

2. Backup existing data

cd /home/deploy/coolify
source venv/bin/activate
python manage.py dumpdata > /home/deploy/data-backup.json

3. In Coolify dashboard

- PostgreSQL: New Resource → Database → PostgreSQL
- Django app: New Resource → Application
- Git repo: https://github.com/Akshat190/test.git
- Branch: coolify
- Build pack: Dockerfile
- Port: 8000
- Domain: kapadiahighschool.com
- Env vars: DATABASE_URL, SECRET_KEY, ALLOWED_HOSTS, CSRF_TRUSTED_ORIGINS, DEBUG=False
- Media files: Add persistent volume mounted at /app/gallery, copy files from /home/deploy/coolify/gallery/

4. Import data

cd /home/deploy/coolify && source venv/bin/activate
export DATABASE_URL="<postgres-connection-string>"
python manage.py migrate
python manage.py loaddata /home/deploy/data-backup.json

5. Once Coolify site works — disable old setup

sudo rm /etc/nginx/sites-enabled/kapadiaschool
sudo systemctl stop gunicorn && sudo systemctl disable gunicorn