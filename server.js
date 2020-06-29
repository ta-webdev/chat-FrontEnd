const express = require('express');
const path = require('path');
var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const app = express();

app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.use(express.static(path.join(__dirname, 'build')));

app.listen(process.env.PORT || 8080);



app.get('/', ({query}, res) =>  res.sendFile(path.join(__dirname, 'build', 'index.html')));
app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));