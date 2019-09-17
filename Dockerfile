FROM node:latest-alpine

ENV APP_DIR="/app" \
	APP_PATH_PREFIX="/arbeid/dagpenger/kalkulator"

COPY build /app/arbeid/dagpenger/kalkulator
EXPOSE 3000 443
