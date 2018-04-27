const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'dist')));

// Api Routes
app.use('/api', api);

// Return other routes to angular index file
app.get('*', function (req, res) {
  res.sendfile(path.join(__dirname, 'dist/index.html'));
});

// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create the http server
const server = http.createServer(app);
server.listen(port, function () {
  console.log('Running on localhost:3000');
});

