# Etapa de build
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

# Copia o pom.xml para que as dependências possam ser baixadas primeiro
COPY pom.xml .

# Copia o arquivo settings.xml personalizado para desabilitar o uso de proxy pelo Maven
# Este arquivo deve ser criado no mesmo diretório do Dockerfile.
COPY maven-settings.xml /usr/share/maven/conf/settings.xml

# Baixa as dependências do Maven, usando o settings.xml personalizado
# Adiciona propriedades para garantir que nenhum proxy seja usado para NENHUM host.
RUN mvn dependency:go-offline -B \
    -s /usr/share/maven/conf/settings.xml \
    -Dhttp.nonProxyHosts="*" \
    -Dhttps.nonProxyHosts="*"

# Copia o restante do código-fonte
COPY . .

# Desabilita uso de proxy e constrói o app
# As mesmas propriedades de não-proxy são aplicadas aqui também.
ENV MAVEN_OPTS=""
RUN mvn clean package -DskipTests \
    -s /usr/share/maven/conf/settings.xml \
    -Dhttp.nonProxyHosts="*" \
    -Dhttps.nonProxyHosts="*"

# Renomeia o JAR gerado para um nome padrao para facilitar a copia na etapa final
RUN mv target/*.jar app.jar

# Etapa final da imagem com JDK mais leve
FROM openjdk:17.0.1-jdk-slim

WORKDIR /app

# Copia o JAR construído da etapa de build para a imagem final
COPY --from=build /app/app.jar app.jar

# Expõe a porta que o aplicativo usará
EXPOSE 8080

# Comando para iniciar o aplicativo quando o contêiner for executado
CMD ["java", "-jar", "app.jar"]
