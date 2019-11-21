FROM navikt/node-express:12.2.0-alpine

ENV REACT_APP_AMPLITUDE_DEV="24eb6d83cfc9883c04c4eaec61251bf4" \
  REACT_APP_AMPLITUDE_PROD="edf391bf01b758a289ef5e7cb297f77a"

RUN mkdir app
COPY build /app
EXPOSE 8000

#ENTRYPOINT ["/dumb-init", "node", "/app/server.js"]
