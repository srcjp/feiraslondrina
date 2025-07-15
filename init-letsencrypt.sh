#!/bin/bash
set -e

if [ ! -f .env ]; then
  echo "Missing .env file" >&2
  exit 1
fi

# load variables
export $(grep -v '^#' .env | xargs)

domains=("$FRONT_DOMAIN" "$BACK_DOMAIN")
email="$LETSENCRYPT_EMAIL"
webroot_path="/var/www/certbot"

if [ -d "nginx/certbot/conf/live/$FRONT_DOMAIN" ]; then
  echo "Certificates already generated."
  exit 0
fi

# start nginx to handle challenge
docker compose up -d nginx

args=""
for d in "${domains[@]}"; do
  args="$args -d $d"
done

docker compose run --rm certbot certonly --webroot -w $webroot_path $args \
  --email $email --rsa-key-size 4096 --agree-tos --no-eff-email

docker compose exec nginx nginx -s reload
