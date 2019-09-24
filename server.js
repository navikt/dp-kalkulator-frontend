const path = require('path');
const express = require('express');
const app = express();

app.use('/arbeid/dagpenger/kalkulator', express.static(__dirname));

app.use(
    '/arbeid/dagpenger/kalkulator/static/js',
    express.static(path.resolve(__dirname, 'static/js'))
);
app.use(
    '/arbeid/dagpenger/kalkulator/static/css',
    express.static(path.resolve(__dirname, 'static/css'))
);
app.use(
    '/arbeid/dagpenger/kalkulator/static/media',
    express.static(path.resolve(__dirname, 'static/media'))
);

app.get('/arbeid/dagpenger/kalkulator/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/arbeid/dagpenger/kalkulator/health/is-alive', function(req, res) {
    res.status(200).send("hei")
});

app.listen(8000);