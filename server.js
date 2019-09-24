const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.use(
    '/static/js',
    express.static(path.resolve(__dirname, 'static/js'))
);
app.use(
    '/static/css',
    express.static(path.resolve(__dirname, 'static/css'))
);
app.use(
    '/static/media',
    express.static(path.resolve(__dirname, 'static/media'))
);

app.get('/arbeid/dagpenger/kalkulator/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/health/is-alive', function(req, res) {
    res.status(200).send("hei")
});

app.listen(8000);