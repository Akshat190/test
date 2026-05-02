#!/bin/bash
set -e

cd /home/deploy/test
git fetch origin
git checkout main
git pull origin main

source venv/bin/activate
pip install -r requirements.txt

python manage.py migrate
python manage.py collectstatic --noinput

sudo chown -R deploy:www-data /home/deploy/test/staticfiles
sudo chmod -R 755 /home/deploy/test/staticfiles

sudo systemctl restart gunicorn-test
sudo systemctl reload nginx

echo "Deployment complete!"
