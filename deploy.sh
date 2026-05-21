#!/bin/bash
# deploy.sh - One-command deploy for Kapadia High School
# Usage: ./deploy.sh
set -e

PROJECT_DIR="/home/deploy/coolify"
LOGS_DIR="$PROJECT_DIR/logs"
VENV_DIR="$PROJECT_DIR/venv"

echo "╔══════════════════════════════════════╗"
echo "║  Kapadia High School - Deploy       ║"
echo "╚══════════════════════════════════════╝"

cd "$PROJECT_DIR"

# ── 1. Pull latest code ──
echo "[1/6] Pulling latest code..."
git fetch origin
git checkout development
git pull origin development
echo "  ✓ $(git rev-parse --short HEAD)"

# ── 2. Ensure logs directory exists ──
echo "[2/6] Ensuring logs directory..."
mkdir -p "$LOGS_DIR"
touch "$LOGS_DIR/django.log"

# ── 3. Install Python dependencies ──
echo "[3/6] Installing dependencies..."
source "$VENV_DIR/bin/activate"
pip install --upgrade pip -q
pip install -r requirements.txt -q
echo "  ✓ Done"

# ── 4. Run migrations ──
echo "[4/6] Running migrations..."
python manage.py migrate
echo "  ✓ Done"

# ── 5. Collect static files ──
echo "[5/6] Collecting static files..."
python manage.py collectstatic --noinput
sudo chown -R deploy:www-data "$PROJECT_DIR/staticfiles" 2>/dev/null || true
sudo chmod -R 755 "$PROJECT_DIR/staticfiles" 2>/dev/null || true
echo "  ✓ Done"

# ── 6. Restart services ──
echo "[6/6] Restarting services..."
if systemctl is-active --quiet gunicorn; then
    sudo systemctl restart gunicorn
    echo "  ✓ Gunicorn restarted"
else
    echo "  ⚠ gunicorn service not found — skipping"
fi

if command -v nginx &>/dev/null; then
    sudo nginx -t && sudo systemctl reload nginx
    echo "  ✓ Nginx reloaded"
fi

# ── Done ──
echo ""
echo "╔══════════════════════════════════════╗"
echo "║  ✅ Deploy Complete!                 ║"
echo "║  → https://kapadiahighschool.com     ║"
echo "╚══════════════════════════════════════╝"
