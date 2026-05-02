#!/bin/bash
# Backup script for Kapadia High School Website
# Run this daily via cron: 0 2 * * * /home/deploy/test/scripts/backup.sh

set -e

BACKUP_DIR="/home/deploy/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_NAME="kapadiaschool_db"
DB_USER="kapadiaschool_user"
RETENTION_DAYS=7

# Create backup directory
mkdir -p "$BACKUP_DIR/db"
mkdir -p "$BACKUP_DIR/media"

echo "Starting backup at $(date)"

# Database backup
echo "Backing up database..."
pg_dump -h 127.0.0.1 -p 5433 -U "$DB_USER" -d "$DB_NAME" -Fc > "$BACKUP_DIR/db/${DB_NAME}_${TIMESTAMP}.dump"

# Media files backup
echo "Backing up media files..."
tar -czf "$BACKUP_DIR/media/media_${TIMESTAMP}.tar.gz" -C /home/deploy/test gallery/

# Clean old backups (keep last 7 days)
echo "Cleaning old backups..."
find "$BACKUP_DIR/db" -name "*.dump" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR/media" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed at $(date)"
echo "Database: $BACKUP_DIR/db/${DB_NAME}_${TIMESTAMP}.dump"
echo "Media: $BACKUP_DIR/media/media_${TIMESTAMP}.tar.gz"
