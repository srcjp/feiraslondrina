# Feiras Londrina Deployment

This project includes a Spring Boot backend and an Angular frontend. A `docker-compose.yml` file is provided to run the application together with a Postgres database. The services can be exposed through the [nginx-proxy](https://github.com/srcjp/proxy) stack which automatically manages SSL certificates with Let's Encrypt.

## Prerequisites
- Docker and Docker Compose
- The proxy stack from [srcjp/proxy](https://github.com/srcjp/proxy) running on the same host

## Usage
1. Copy `.env.example` to `.env` and adjust the domain names, email address and database password.

```bash
cp .env.example .env
# edit .env to match your environment
```

2. Build and start the containers:

```bash
docker-compose up -d --build
```

The backend will be available through the domain defined in `BACK_DOMAIN` and the frontend through `FRONT_DOMAIN`. SSL certificates are obtained automatically by the proxy stack.

## Networks
This compose file uses an external network named `proxy`. Ensure the proxy stack creates this network before starting the services:

```bash
docker network create proxy
```

Refer to the proxy repository for more details on configuring Nginx and Let's Encrypt.
