FROM python:3.13-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN groupadd --system aedis && useradd --system --gid aedis --create-home aedis
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --requirement requirements.txt

COPY . .
RUN chmod +x /app/entrypoint.sh \
    && mkdir -p /data/quarantine \
    && chown -R aedis:aedis /app /data

USER aedis
EXPOSE 8000
ENTRYPOINT ["/app/entrypoint.sh"]
