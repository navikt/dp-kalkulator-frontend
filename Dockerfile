FROM navikt/node-express:16

WORKDIR /

COPY ./build build
COPY ./server server

WORKDIR /server

EXPOSE 8000
CMD [ "node", "server.js" ]
