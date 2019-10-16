// const path = require('path');
const express = require('express');
const getDecorator = require('./decorator');

const port = process.env.PORT || 8000;

const app = express();

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

// app.get('/', (req, res) => {
//  res.sendFile(path.resolve(__dirname, 'index.html'));
// });

app.get('/health/isAlive', (req, res) => res.sendStatus(200));
app.get('/health/isReady', (req, res) => res.sendStatus(200));

const server = app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://${app.address().address}:${app.address().port}`);
});

process.on('SIGINT', () => {
  console.log('✊ Caught SIGINT. Shutting down! ☠️');

  server.close(() => {
    process.exit(0);
  });
});

getDecorator()
  .then(renderApp, error => {
    console.log('Failed to get decorator', error);
    process.exit(1);
  })
  .then(startServer, error => console.log('Failed to render app', error));
