# Feiras Londrina - Deploy com Nginx

Este repositório contém o backend em Spring Boot e o frontend em Angular. Todo o deploy é feito via **Docker Compose** em uma máquina Ubuntu 22.04, usando o Nginx para proxy reverso e certificados Let's Encrypt.

## 1. Preparar o servidor
1. Instale **Docker** e **Docker Compose**:
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose -y
   sudo usermod -aG docker $USER
   ```
   Refaça o login após adicionar o usuário ao grupo `docker`.
2. Garanta que as portas `80` e `443` estejam liberadas.

## 2. Obter o projeto
1. Clone este repositório na máquina de deploy (ex: `/opt/feiraslondrina`):
   ```bash
   git clone <repo> /opt/feiraslondrina
   cd /opt/feiraslondrina
   ```
2. Copie `.env.example` para `.env` e edite os valores:
   - `FRONT_DOMAIN` – domínio para o Angular (ex: `feiraslondrina.com.br`)
   - `BACK_DOMAIN` – domínio para a API (ex: `api.feiraslondrina.com.br`)
   - `LETSENCRYPT_EMAIL` – e‑mail para avisos do Let's Encrypt
   - `POSTGRES_PASSWORD` – senha do banco
   ```bash
   cp .env.example .env
   nano .env
   ```

## 3. Ajustar credenciais
Altere credenciais presentes no código fonte antes do deploy:
- `back/src/main/resources/application.properties`
- `back/src/main/java/com/securitygateway/loginboilerplate/configuration/MailConfiguration.java`
- `back/src/main/java/com/securitygateway/loginboilerplate/service/EmailService.java`
- `back/src/main/java/com/securitygateway/loginboilerplate/constants/ApplicationConstants.java`

## 4. Build e inicialização
Compile as imagens e inicie os contêineres (db, backend, frontend e nginx):
```bash
docker compose up -d --build db backend frontend nginx
```

## 5. Gerar certificados SSL
Execute uma única vez o script que solicita os certificados Let's Encrypt para os domínios informados em `.env`:
```bash
./init-letsencrypt.sh
```

## 6. Renovação automática
Agende o script `renew-cert.sh` no cron para executar diariamente:
```bash
crontab -e
# Adicione a linha abaixo
0 3 * * * /opt/feiraslondrina/renew-cert.sh >/dev/null 2>&1
```
Ele renova os certificados, quando necessário, e recarrega o Nginx.

## 7. Acessar
- Frontend: `https://$FRONT_DOMAIN`
- Backend: `https://$BACK_DOMAIN`

Use `docker compose logs -f` para verificar possíveis problemas.
