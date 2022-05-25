FROM navikt/node-express:12.2.0-alpine

WORKDIR /

COPY ./build build
COPY ./server server

WORKDIR /server

EXPOSE 8000
CMD [ "node", "server.js" ]
