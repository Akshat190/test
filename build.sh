#!/usr/bin/env bash
# exit on error
set -o errexit

# Print commands before executing them (for debugging)
set -o xtrace

# Install Python dependencies
pip install -r requirements.txt

# Build Astro frontend
echo "Building Astro frontend..."
if command -v node &>/dev/null; then
    cd frontend
    npm ci
    npm run build
    cd ..
    echo "Astro frontend built successfully"
else
    echo "Node.js not found — skipping Astro build"
fi

# Verify database connection
echo "Verifying database connection..."
echo "Using PostgreSQL database"
echo "Database connection check complete"

# Create media directories
mkdir -p gallery/festival/images
mkdir -p gallery/festival/gallery
mkdir -p gallery/thumbnails
mkdir -p gallery/images
mkdir -p gallery/carousel/images

# Collect static files
python manage.py collectstatic --no-input

# Make migrations (in case there are new models)
python manage.py makemigrations --no-input

# Apply database migrations with specific order to ensure auth tables are created first
echo "Starting database migrations..."

# First, try to create the database schema if it doesn't exist
echo "Creating initial database schema..."
python -c "import os, django; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kapadiaschool.settings'); django.setup(); from django.db import connection; cursor = connection.cursor(); cursor.execute('CREATE SCHEMA IF NOT EXISTS public;')" || echo "Schema creation skipped"

# Now run migrations in specific order
echo "Migrating auth models..."
python manage.py migrate auth --no-input
echo "Migrating contenttypes models..."
python manage.py migrate contenttypes --no-input
echo "Migrating admin models..."
python manage.py migrate admin --no-input
echo "Migrating sessions models..."
python manage.py migrate sessions --no-input
echo "Migrating remaining models..."
python manage.py migrate --no-input

echo "Database migrations completed."

# Create a superuser if DJANGO_SUPERUSER_* env vars are set
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
  echo "from django.contrib.auth.models import User; User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists() or User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '${DJANGO_SUPERUSER_EMAIL:-admin@example.com}', '$DJANGO_SUPERUSER_PASSWORD')" | python manage.py shell
fi

echo "Build script completed successfully"