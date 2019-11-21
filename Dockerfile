FROM navikt/node-express:12.2.0-alpine
RUN mkdir app
COPY build /app
EXPOSE 8000
