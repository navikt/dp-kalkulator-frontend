FROM navikt/node-express:16

WORKDIR /

RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    NODE_AUTH_TOKEN=$(cat /run/secrets/NODE_AUTH_TOKEN)

COPY ./build build
COPY ./server server

WORKDIR /server

EXPOSE 8000
CMD [ "node", "server.js" ]
