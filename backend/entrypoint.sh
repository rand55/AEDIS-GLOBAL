#!/bin/sh
set -eu
python manage.py migrate
python manage.py seed --if-empty
exec gunicorn --bind 0.0.0.0:8000 --workers "${GUNICORN_WORKERS:-2}" --threads "${GUNICORN_THREADS:-4}" --timeout 60 --access-logfile - --error-logfile - "wsgi:aedis_app"
