#!/bin/bash
# astro.sh - One-command Astro frontend deploy for Kapadia High School
# Usage: ./astro.sh
# Safe to re-run. Pulls the astro-build branch, rebuilds the static
# frontend, keeps Django running for /admin + /api, serves pages from
# frontend/dist via nginx. Backs up nginx config before touching it.
set -e

BRANCH="astro-build"
PROJECT_DIR="/home/deploy/test"
FRONTEND_DIR="$PROJECT_DIR/frontend"
DIST_DIR="$FRONTEND_DIR/dist"
SNIPPET_SRC="$PROJECT_DIR/nginx/kapadiaschool-astro.conf"
SNIPPET_DST="/etc/nginx/sites-enabled/kapadiaschool"
VENV_DIR="$PROJECT_DIR/venv"

echo "========================================"
echo "  KHS Astro Deploy ($BRANCH)"
echo "========================================"

cd "$PROJECT_DIR"

# -- 1. Pull latest code --
echo "[1/7] Pulling latest code..."
git fetch origin
if [ -n "$(git status --porcelain -- frontend/ nginx/ 2>/dev/null)" ]; then
    echo "  ERROR local changes in frontend/ or nginx/ — stash or commit first:"
    git status --porcelain -- frontend/ nginx/
    exit 1
fi
git checkout "$BRANCH"
git pull origin "$BRANCH"
echo "  OK $(git rev-parse --short HEAD)"

# -- 2. Clear stale build state (VPS once had frontend/ with no package.json) --
echo "[2/7] Cleaning stale frontend state..."
rm -rf "$FRONTEND_DIR/.astro" "$FRONTEND_DIR/node_modules"
if [ ! -f "$FRONTEND_DIR/package.json" ]; then
    echo "  ERROR $FRONTEND_DIR/package.json missing after checkout — aborting"
    exit 1
fi

# -- 3. Build Astro (static output -> frontend/dist) --
echo "[3/7] Building Astro frontend..."
if ! command -v node &>/dev/null; then
    echo "  ERROR Node.js not found (need >=22.12). Aborting."
    exit 1
fi
cd "$FRONTEND_DIR"
npm ci
npm run build
cd "$PROJECT_DIR"
if [ ! -f "$DIST_DIR/index.html" ]; then
    echo "  ERROR build produced no $DIST_DIR/index.html — aborting before nginx changes"
    exit 1
fi
echo "  OK dist built ($(du -sh "$DIST_DIR" | cut -f1))"

# -- 4. Django: migrations + static (keeps /admin + /api working) --
echo "[4/7] Django migrations + collectstatic..."
source "$VENV_DIR/bin/activate"
python manage.py migrate
python manage.py collectstatic --noinput
sudo chown -R deploy:www-data "$PROJECT_DIR/staticfiles" 2>/dev/null || true
echo "  OK"

# -- 5. Install nginx snippet (backup first, never overwrite nginx.conf) --
echo "[5/7] Installing nginx snippet..."
if [ ! -f "$SNIPPET_SRC" ]; then
    echo "  ERROR $SNIPPET_SRC missing — aborting"
    exit 1
fi
BACKUP="$SNIPPET_DST.bak-$(date +%Y%m%d-%H%M%S)"
sudo cp "$SNIPPET_DST" "$BACKUP" 2>/dev/null || echo "  (no existing snippet to back up)"
sudo cp "$SNIPPET_SRC" "$SNIPPET_DST"
if sudo nginx -t; then
    echo "  OK nginx config valid (backup: $BACKUP)"
else
    echo "  ERROR nginx -t failed — restoring backup"
    sudo cp "$BACKUP" "$SNIPPET_DST"
    exit 1
fi

# -- 6. Restart + reload --
echo "[6/7] Restarting services..."
sudo systemctl restart gunicorn
sudo systemctl reload nginx
echo "  OK"

# -- 7. Smoke test (405/400 from the API still proves it is wired up) --
echo "[7/7] Smoke test..."
sleep 2
code=$(curl -sk -o /dev/null -w "%{http_code}" "https://localhost/" || echo "000")
echo "  / -> HTTP $code"
code=$(curl -sk -o /dev/null -w "%{http_code}" -X POST \
    -H 'Content-Type: application/json' -d '{}' \
    "https://localhost/api/contact/" || echo "000")
echo "  POST /api/contact/ {} -> HTTP $code (400 = view alive, validation working)"
code=$(curl -sk -o /dev/null -w "%{http_code}" "https://localhost/admin/login/" || echo "000")
echo "  /admin/login/ -> HTTP $code"

echo ""
echo "========================================"
echo "  Astro Deploy Complete!"
echo "  https://kapadiahighschool.com"
echo "========================================"
