const contentSecurityPolicy = require('./csp');
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const getDecorator = require('./decorator');

const app = express();

const buildPath = path.resolve(__dirname, '../build');
const basePath = '/arbeid/dagpenger/kalkulator';

app.set('views', `${__dirname}/../build`);
app.set('view engine', 'mustache');
app.engine('html', mustacheExpress());

// Parse application/json
app.use(express.json());
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});

// csp
app.use(contentSecurityPolicy);

// Static files
app.use(basePath, express.static(buildPath, { index: false }));

// Nais functions
app.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

// Match everything except internal og static
app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
    getDecorator()
        .then((fragments) => {
            res.render('index.html', fragments);
        })
        .catch((e) => {
            const error = `Failed to get decorator: ${e}`;
            console.error(error);
            res.status(500).send(error);
        })
);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.info(`🚀 App listening on port: ${port}`));

process.on('SIGINT', () => {
    console.log('✊ Caught SIGINT. Shutting down! ☠️');
    server.close(() => {
        process.exit(0);
    });
});
