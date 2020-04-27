const http = require('http');
const express = require('express');
const app = new express();

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

app.listen(port, () => console.log('codenames app listening on port 3000'));