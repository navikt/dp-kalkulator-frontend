FROM navikt/nginx-oidc:latest

ENV APP_DIR="/app" \
	APP_PATH_PREFIX="/dp-inntekt-innsyn-ui" \
	APP_CALLBACK_PATH="/dp-inntekt-innsyn-ui/oidc/callback"

COPY build /app/inntekter/

COPY nais/proxy.nginx      /nginx/proxy.nginx
EXPOSE 3000 443
