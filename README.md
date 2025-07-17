# Feiras Londrina

Este repositório contém o front-end em Angular e o back-end em Spring Boot de uma aplicação para gerenciamento de feiras em Londrina. Foram adicionados arquivos de Docker para facilitar a execução dos serviços em qualquer ambiente.

## Requisitos
- Docker
- Docker Compose

## Como executar
1. Copie o arquivo `.env.example` para `.env` e defina `LETSENCRYPT_EMAIL` com seu e-mail.
2. Para gerar os certificados SSL execute:
   ```bash
   docker compose run --rm certbot \
     sh -c "certbot certonly --webroot \
     --webroot-path=/var/www/certbot \
     --email \"$LETSENCRYPT_EMAIL\" --agree-tos --no-eff-email \
     -d feiraslondrina.com.br -d www.feiraslondrina.com.br \
     -d api.feiraslondrina.com.br"
   ```
  > **Importante**: Execute o passo acima antes de iniciar os containers. Sem os certificados o servico `front` nao conseguira iniciar.
  Se nenhuma pasta `nginx/certbot/conf/live` for criada, o Certbot nao conseguiu validar
  seus dominios. Verifique a saida do comando e certifique-se de que os registros DNS
  apontam para este servidor e que as portas **80** e **443** estao liberadas.
3. Inicie os serviços normalmente:
   ```bash
   docker compose up --build
   ```
   Após apontar o DNS para sua máquina, o site ficará disponível em `https://feiraslondrina.com.br` e a API em `https://api.feiraslondrina.com.br`.

Os containers criados são:
- **db**: instância PostgreSQL com volume persistente.
- **back**: aplicação Spring Boot.
- **front**: aplicação Angular servida pelo Nginx com HTTPS.
- **certbot**: responsável por renovar os certificados automaticamente.

Para parar os serviços utilize `docker compose down`.
