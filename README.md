# dp-kalkulator-frontend

Frontend for dagpengekalkulatoren på nav.no (https://www.nav.no/arbeid/dagpenger/kalkulator/).
Gir bruker automatisk innsikt i hvor mye de kan få i dagpenger basert på data fra skattetaten og regler i dagpengereglverket.
Henter data fra [dp-kalkulator-api](https://github.com/navikt/dp-kalkulator-api)

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
