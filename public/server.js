const express = require('express');
const path = require('path');
const fs = require('fs');
const getDecorator = require('./scripts/decorator');

const port = process.env.PORT || 8000;

const app = express();

/*
app.set('views', path.resolve(__dirname));
app.set('view engine', 'mustache');
app.engine('html', mustacheExpress());
*/

app.set('views', path.resolve(__dirname));
app.set('view engine', 'html');
app.engine('html', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    // this is an extremely simple template engine
    const rendered = content
      .toString()
      .replace('{{{NAV_SCRIPTS}}}', `${options.NAV_SCRIPTS}`)
      .replace('{{{NAV_STYLES}}}', `${options.NAV_STYLES}`)
      .replace('{{{NAV_HEADING}}}', `${options.NAV_HEADING}`)
      .replace('{{{NAV_FOOTER}}}', `${options.NAV_FOOTER}`);
    return callback(null, rendered);
  });
});

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('X-Content-Type-Options', 'nosniff');
  res.status(404).send("Beklager, denne siden ble ikke funnet. o.O");
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
  // app.use(express.static(__dirname));
  app.use('/arbeid/dagpenger/kalkulator/static/js', express.static(path.resolve(__dirname, 'static/js')));
  app.use('/arbeid/dagpenger/kalkulator/static/css', express.static(path.resolve(__dirname, 'static/css')));
  app.use('/arbeid/dagpenger/kalkulator/static/media', express.static(path.resolve(__dirname, 'static/media')));
  app.use('/locales', express.static(path.resolve(__dirname, 'locales')));


  app.get('/arbeid/dagpenger/kalkulator/health/is-alive', (req, res) => res.sendStatus(200));
  app.get('/arbeid/dagpenger/kalkulator/health/is-ready', (req, res) => res.sendStatus(200));

  app.get(/^(?!.*\/static).*$/, (req, res) => {
    res.send(html);
  });

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
