#!/bin/bash
set -e

if [ ! -f .env ]; then
  echo "Missing .env file" >&2
  exit 1
fi

export $(grep -v '^#' .env | xargs)

docker compose run --rm certbot renew --webroot -w /var/www/certbot --quiet

docker compose exec nginx nginx -s reload
