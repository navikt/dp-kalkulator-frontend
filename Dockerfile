FROM node:current-alpine

EXPOSE 443

RUN mkdir app
WORKDIR app

COPY build /app