FROM navikt/nginx-oidc:latest

ENV APP_DIR="/app" \

COPY build /app/

COPY nais/proxy.nginx      /nginx/proxy.nginx
EXPOSE 3000 443
