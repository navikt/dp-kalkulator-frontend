# production environment
FROM node:current-alpine
RUN mkdir app
WORKDIR app
COPY build /app
EXPOSE 443
CMD ["node", "server"]

