# Feiras Londrina

Este repositório contém o front-end em Angular e o back-end em Spring Boot de uma aplicação para gerenciamento de feiras em Londrina. Foram adicionados arquivos de Docker para facilitar a execução dos serviços em qualquer ambiente.

## Requisitos
- Docker
- Docker Compose

## Como executar
1. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis se necessário.
2. Execute o comando abaixo na raiz do projeto:
   ```bash
   docker compose up --build
   ```
3. O front ficará disponível em `http://localhost` e a API em `http://localhost:8080`.

Os containers criados são:
- **db**: instância PostgreSQL com volume persistente.
- **back**: aplicação Spring Boot.
- **front**: aplicação Angular servida pelo Nginx.

Para parar os serviços utilize `docker compose down`.
