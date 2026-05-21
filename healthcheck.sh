#!/bin/bash
# healthcheck.sh - Auto-recover if site goes down
# Run via cron: */5 * * * * /home/deploy/test/healthcheck.sh

PROJECT_DIR="/home/deploy/test"
LOGS_DIR="$PROJECT_DIR/logs"
URL="https://kapadiahighschool.com"

# Check if site responds
HTTP_CODE=$(curl -sf -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "000" ] || [ "$HTTP_CODE" -ge 500 ]; then
    echo "[$(date)] Site down (HTTP $HTTP_CODE). Restarting services..." >> "$LOGS_DIR/healthcheck.log"
    sudo systemctl restart gunicorn
    sudo systemctl reload nginx
    sleep 3
    RETRY=$(curl -sf -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null || echo "000")
    echo "[$(date)] Recovery attempt → HTTP $RETRY" >> "$LOGS_DIR/healthcheck.log"
fi
