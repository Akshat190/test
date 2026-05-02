# Kapadia High School Website

A Django-based website for Kapadia High School, built with simplicity and local storage in mind.

## Tech Stack

- Django 4.2
- PostgreSQL (production) / SQLite (development)
- WhiteNoise for static files
- Pillow for image processing
- Bootstrap 5 (CDN)

## Local Development

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Admin Panel

Access `/admin/` to manage:
- **Carousel Images** – homepage banner slides
- **Celebrations** – festivals & school events with photo galleries
- **Galleries** – categorized photo collections

## Environment Variables (Production)

```bash
SECRET_KEY=your-secret-key
DEBUG=False
DB_NAME=kapadiaschool_db
DB_USER=kapadiaschool_user
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

## Project Structure

```
kapadiaschool/    # Django project settings
khschool/         # Main Django app (models, views, urls, admin)
templates/        # HTML templates
static/           # CSS, JS, images, documents
gallery/          # Uploaded media (local dev)
```

## License

Internal use only.
