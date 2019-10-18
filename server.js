// const path = require('path');
const express = require('express');
const path = require('path');
const Promise = require('promise');
const mustacheExpress = require('mustache-express');
const getDecorator = require('./public/scripts/decorator');

const port = process.env.PORT || 8000;

const app = express();

app.set('views', path.resolve(__dirname, 'build'));
app.set('view engine', 'mustache');
app.engine('html', mustacheExpress());

app.use(express.static(__dirname));

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});

const renderApp = decoratorFragments =>
  new Promise((resolve, reject) => {
    app.render('index.html', decoratorFragments, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });

const startServer = html => {
  app.use('*/static/js', express.static(path.resolve(__dirname, '/static/js')));
  app.use('*/static/css', express.static(path.resolve(__dirname, '/static/css')));
  app.use('*/static/media', express.static(path.resolve(__dirname, '/static/media')));
  app.use('*/locales', express.static(path.resolve(__dirname, '/locales')));

  app.get(/^\/(?!.*build).*$/, (req, res) => {
    res.send(html);
  });

  app.get('/arbeid/dagpenger/kalkulator/health/is-alive', (req, res) => res.sendStatus(200));
  app.get('/arbeid/dagpenger/kalkulator/health/is-ready', (req, res) => res.sendStatus(200));

  const server = app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
  });

  process.on('SIGINT', () => {
    console.log('✊ Caught SIGINT. Shutting down! ☠️');

    server.close(() => {
      process.exit(0);
    });
  });
};

getDecorator()
  .then(renderApp, error => {
    console.log('Failed to get decorator', error);
    process.exit(1);
  })
  .then(startServer, error => console.log('Failed to render app', error));
