# production environment
FROM node:current-alpine
RUN mkdir app
COPY build /app/build
COPY server.js /app
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

