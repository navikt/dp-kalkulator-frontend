# dp-inntekt-innsyn-ui

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=navikt_dp-inntekt-innsyn-ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=navikt_dp-inntekt-innsyn-ui)


## Utvikling

### Utvikle lokalt

`npm install`

`npm start`

Api'et blir automatisk mocket i dev, for å skru av mock kan du gå i filen `src/Api/index.js` og sette `const mock = false;`

### Lokal server

Installer server-deps:

`npm --prefix ./server install`

`npm run server`

### Bygg og kjør docker-container

`npm run docker`

## Kontakt

Interne henvendelser kan sendes via Slack i kanalen #team-dagpenger.
