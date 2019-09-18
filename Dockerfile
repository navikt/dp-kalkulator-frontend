# production environment
FROM node:current-alpine
RUN mkdir app
WORKDIR app
COPY build /app
COPY src/server.js /app
RUN npm install express
EXPOSE 443
CMD ["node", "server"]

