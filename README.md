# Feiras Londrina

Este repositório contém dois projetos separados:

* `back` – aplicação Spring Boot
* `front` – aplicação Angular

Para facilitar a execução local, foi adicionado um arquivo `docker-compose.yml` que sobe a aplicação completa com banco de dados PostgreSQL.

## Executando com Docker

Certifique-se de ter o Docker e o Docker Compose instalados. Para iniciar todos os serviços, execute:

```bash
docker compose up --build
```

Os contêners iniciados são:

- **db**: PostgreSQL na porta `5432`.
- **back**: aplicação Spring Boot na porta `8080`.
- **front**: aplicação Angular servida pelo Nginx na porta `80`.

O backend utiliza por padrão o banco de dados `JwtRefresh` com usuário e senha `postgres`, configurados no `docker-compose.yml`.
