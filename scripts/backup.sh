#!/bin/bash
# Manual backup: database dump + media archive.
# Usage: sudo ./scripts/backup.sh   (no cron; run it whenever you want a copy)
set -euo pipefail

PROJECT_DIR="/home/deploy/new-codebase"
DEST="/home/deploy/backups/daily"
STAMP="$(date +%Y%m%d-%H%M)"

mkdir -p "$DEST" || { echo "ERROR: cannot create $DEST — run with sudo" >&2; exit 1; }

DATABASE_URL="$(grep -E '^DATABASE_URL=' "$PROJECT_DIR/.env" | cut -d= -f2- | tr -d '"')"
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL not found in $PROJECT_DIR/.env" >&2
  exit 1
fi

echo "[$(date -Is)] database dump"
pg_dump "$DATABASE_URL" | gzip > "$DEST/db-$STAMP.sql.gz"

echo "[$(date -Is)] media archive"
tar czf "$DEST/gallery-$STAMP.tar.gz" -C /home/deploy/test gallery

echo "[$(date -Is)] done: $(du -sh "$DEST" | cut -f1) in $DEST"
