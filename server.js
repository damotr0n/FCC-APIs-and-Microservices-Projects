// server.js
// where your node app starts

// init project
const bodyParser = require('body-parser');
const dns = require('dns');
const express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// body parser middleware
app.use(
  bodyParser.urlencoded({extended: false})
);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// --------------------------------------
// Timestamp Microservice
var timestamp = require('./routes/timestamp')
app.use("/api/timestamp", timestamp)
// --------------------------------------

// --------------------------------------
// Request Header Parser Microservice
var headerparser = require("./routes/headerparser")
app.use("/api/whoami", headerparser)
// --------------------------------------

// --------------------------------------
// URL Shortener
var urlshortener = require("./routes/urlshortener")
app.use("/api/shorturl", urlshortener)
// --------------------------------------

// --------------------------------------
// Exercise Tracker
var exercisetracker = require("./routes/exercisetracker")
app.use("/api/exercise", exercisetracker)
// --------------------------------------

// --------------------------------------
// File Metadata
var filemetadada = require("./routes/filemedatada")
app.use("/api/", filemetadada)
// --------------------------------------

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
