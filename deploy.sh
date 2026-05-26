#!/bin/bash
# deploy.sh - One-command deploy for Kapadia High School
# Usage: ./deploy.sh
set -e

PROJECT_DIR="/home/deploy/test"
LOGS_DIR="$PROJECT_DIR/logs"
VENV_DIR="$PROJECT_DIR/venv"
NODE_VERSION_REQUIRED="22.12.0"

echo "╔══════════════════════════════════════╗"
echo "║  Kapadia High School - Deploy       ║"
echo "╚══════════════════════════════════════╝"

cd "$PROJECT_DIR"

# ── 1. Pull latest code ──
echo "[1/7] Pulling latest code..."
git fetch origin
git checkout development
git pull origin development
echo "  ✓ $(git rev-parse --short HEAD)"

# ── 2. Build Astro frontend ──
echo "[2/7] Building Astro frontend..."
if [ ! -f "frontend/package.json" ]; then
    echo "  ⚠ frontend/package.json not found — skipping frontend build"
else
    cd frontend
    NODE_VERSION=$(node -v 2>/dev/null | cut -c2-)
    if [ -z "$NODE_VERSION" ]; then
        echo "  ⚠ Node.js not found — skipping frontend build"
        cd "$PROJECT_DIR"
    elif [ "$(printf '%s\n' "$NODE_VERSION_REQUIRED" "$NODE_VERSION" | sort -V | head -n1)" != "$NODE_VERSION_REQUIRED" ]; then
        echo "  ⚠ Node.js >= $NODE_VERSION_REQUIRED required (found v$NODE_VERSION) — skipping frontend build"
        cd "$PROJECT_DIR"
    else
        npm ci --no-audit --no-fund
        npm run build
        echo "  ✓ Frontend built"
        cd "$PROJECT_DIR"
    fi
fi

# ── 3. Ensure logs directory exists ──
echo "[3/7] Ensuring logs directory..."
mkdir -p "$LOGS_DIR"
touch "$LOGS_DIR/django.log"

# ── 4. Install Python dependencies ──
echo "[4/7] Installing dependencies..."
source "$VENV_DIR/bin/activate"
pip install --upgrade pip -q
pip install -r requirements.txt -q
echo "  ✓ Done"

# ── 5. Run migrations BEFORE reload ──
echo "[5/7] Running migrations..."
python manage.py migrate
echo "  ✓ Done"

# ── 6. Collect static files ──
echo "[6/7] Collecting static files..."
python manage.py collectstatic --noinput
sudo chown -R deploy:www-data "$PROJECT_DIR/staticfiles" 2>/dev/null || true
sudo chmod -R 755 "$PROJECT_DIR/staticfiles" 2>/dev/null || true
echo "  ✓ Done"

# ── 7. Reload services ──
echo "[7/7] Reloading services..."
if systemctl is-active --quiet gunicorn; then
    sudo systemctl reload gunicorn
    echo "  ✓ Gunicorn reloaded"
else
    echo "  ⚠ gunicorn service not found — skipping"
fi

if command -v nginx &>/dev/null; then
    sudo nginx -t && sudo systemctl reload nginx
    echo "  ✓ Nginx reloaded"
fi

# ── Health check ──
sleep 3
HEALTH_URL="https://kapadiahighschool.com/health/"
if curl -sf "$HEALTH_URL" > /dev/null 2>&1; then
    echo "  ✓ Health check passed"
else
    echo "  ⚠ Health check failed — manual investigation needed"
fi

# ── Done ──
echo ""
echo "╔══════════════════════════════════════╗"
echo "║  ✅ Deploy Complete!                 ║"
echo "║  → https://kapadiahighschool.com     ║"
echo "╚══════════════════════════════════════╝"
