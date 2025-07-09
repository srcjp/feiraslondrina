# Feiras Londrina - Guia de Deploy

Este repositório contem o backend em Spring Boot e o frontend em Angular. Os contêineres são orquestrados pelo **docker-compose** e podem ser publicados atrás do [proxy](https://github.com/srcjp/proxy) que trata de HTTPS via Let's Encrypt.

## 1. Preparar o servidor
1. Instale **Docker** e **Docker Compose**.
2. Certifique-se de que as portas `80` e `443` estão liberadas.

## 2. Iniciar o proxy
1. Clone o repositório do proxy em qualquer pasta, por exemplo `~/proxy`:
   ```bash
   git clone https://github.com/srcjp/proxy ~/proxy
   cd ~/proxy
   docker network create proxy   # cria a rede externa se ainda não existir
   docker-compose up -d
   ```
   O proxy cria a rede `proxy` que será utilizada neste projeto para expor os serviços com HTTPS.

## 3. Obter este projeto
1. Faça clone deste repositório na máquina (ex: `/opt/feiraslondrina`):
   ```bash
   git clone <repo> /opt/feiraslondrina
   cd /opt/feiraslondrina
   ```

2. Copie `.env.example` para `.env` e edite os valores:
   - `FRONT_DOMAIN` – domínio para o Angular (ex: `feiraslondrina.com.br`)
   - `BACK_DOMAIN` – domínio para a API (ex: `api.feiraslondrina.com.br`)
   - `LETSENCRYPT_EMAIL` – email para avisos do Let's Encrypt
   - `POSTGRES_PASSWORD` – defina uma senha forte para o banco

   ```bash
   cp .env.example .env
   nano .env  # ou o editor de sua preferência
   ```

3. (Opcional) Ajuste os arquivos `front/src/environmet/environment.prod.ts` e `front/src/environmet/environment.ts` caso utilize domínios diferentes da API.

## 4. Trocar informações sensíveis
Alguns arquivos contêm credenciais de exemplo que **devem ser alteradas** antes do deploy:

- `back/src/main/resources/application.properties` – informações de acesso ao banco e configuração do serviço de e-mail.
- `back/src/main/java/com/securitygateway/loginboilerplate/configuration/MailConfiguration.java` – usuário e senha do e-mail SMTP.
- `back/src/main/java/com/securitygateway/loginboilerplate/service/EmailService.java` – endereço do remetente usado nos e-mails.
- `back/src/main/java/com/securitygateway/loginboilerplate/constants/ApplicationConstants.java` – valor de `SECRET_KEY` utilizado para assinar o JWT.

Altere essas credenciais para valores que apenas você conheça. É possível também removê-las do código e fornecer via variáveis de ambiente se preferir.

## 5. Build e inicialização
Execute o `docker-compose` para compilar as imagens e iniciar os serviços:

```bash
docker-compose up -d --build
```

O backend e o frontend serão ligados e registrados no proxy. Aguarde alguns minutos para que o Let's Encrypt emita os certificados.

## 6. Acessar
- Frontend: `https://feiraslondrina.com.br` (ou o domínio configurado em `FRONT_DOMAIN`)
- Backend: `https://api.feiraslondrina.com.br` (ou o domínio de `BACK_DOMAIN`)

Verifique os logs com `docker-compose logs -f` caso algo não funcione.

Com esses passos o projeto estará disponível publicamente utilizando o proxy para HTTPS.
