# Build stage
FROM node:20 AS build
ARG BACK_DOMAIN
ENV BACK_DOMAIN=${BACK_DOMAIN:-api.feiraslondrina.com.br}
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN sed -i "s@https://api.feiraslondrina.com.br@https://${BACK_DOMAIN}@" src/environmet/environment.prod.ts && \
    npm run build -- --configuration production

# Runtime stage
FROM nginx:stable-alpine
COPY --from=build /app/dist/cadeopet/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
