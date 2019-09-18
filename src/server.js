const express = require('express');
const app = express();

//app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.render('index.html');
    //res.sendFile('index.html');
});

app.get('/health/is-alive', function(req, res) {
    res.status(200).send("hei");
});

app.listen(443);