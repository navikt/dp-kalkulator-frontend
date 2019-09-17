FROM node:current-alpine

EXPOSE 5000

RUN mkdir app
WORKDIR app

COPY build /app

RUN npm i -g serve

CMD ["serve"]