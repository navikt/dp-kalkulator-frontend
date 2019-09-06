FROM navikt/nginx-oidc:latest

ENV APP_DIR="/app" \
	APP_PATH_PREFIX="/arbeid/dagpenger/kalkulator" \
	APP_CALLBACK_PATH="/arbeid/dagpenger/kalkulator/oidc/callback"

COPY build /app/arbeid/dagpenger/kalkulator

COPY nais/proxy.nginx      /nginx/proxy.nginx
EXPOSE 3000 443
