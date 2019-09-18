# production environment
FROM node:current-alpine
RUN mkdir app
WORKDIR app
COPY build /app
COPY src/server.js /app
COPY node_modules /app/node_modules
EXPOSE 443
CMD ["node", "server"]

