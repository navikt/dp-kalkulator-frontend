const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/arbeid/dagpenger/kalkulator/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/arbeid/dagpenger/kalkulator/health/is-alive', function(req, res) {
    res.status(200).send("hei")
});

app.listen(8000);