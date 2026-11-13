#!/bin/bash
# deploy.sh - deploy the new-codebase worktree
# Usage: ./deploy.sh
set -e

PROJECT_DIR="/home/deploy/new-codebase"
VENV_DIR="$PROJECT_DIR/venv"
BRANCH="new-codebase"

echo "========================================"
echo "  Kapadia High School - new-codebase deploy"
echo "========================================"

cd "$PROJECT_DIR"

echo "[1/7] Pulling $BRANCH..."
git fetch origin
git pull --ff-only origin "$BRANCH"
echo "  OK $(git rev-parse --short HEAD)"

echo "[2/7] Installing Python dependencies..."
source "$VENV_DIR/bin/activate"
pip install -r requirements.txt -q
echo "  OK"

echo "[3/7] Migrating..."
python manage.py migrate --noinput
echo "  OK"

echo "[4/7] Collecting static files..."
python manage.py collectstatic --noinput
echo "  OK"

echo "[5/7] Restarting new Django..."
sudo systemctl restart khs-new.service
for i in $(seq 1 30); do
  curl -fsS -o /dev/null http://127.0.0.1:8001/health/ 2>/dev/null && break
  sleep 1
done
curl -fsS -o /dev/null http://127.0.0.1:8001/health/ || { echo "  FAILED: Django not healthy on 8001"; exit 1; }
echo "  OK"

echo "[6/7] Building Next..."
cd "$PROJECT_DIR/frontend"
export PATH="$HOME/.bun/bin:$PATH"
bun install --frozen-lockfile
DJANGO_URL=http://127.0.0.1:8001 bun run build
echo "  OK"

echo "[7/7] Restarting Next and nginx..."
sudo systemctl restart khs-next.service
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "Deploy complete: https://kapadiahighschool.com"
