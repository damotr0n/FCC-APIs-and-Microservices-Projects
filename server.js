// server.js
// where your node app starts

// --------------------------------------
// Globals
const URL_REGEX = /^https?:\/\/(www\.)?(?<url>[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6})\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
// --------------------------------------

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
app.get("/api/timestamp/:date?", function (req, res) {
  var ERR = false;
  var inputDate = req.params.date;
  console.log("--------")
  console.log(inputDate);
  
  var date;

  // if empty
  if(!inputDate){
    date = new Date();
  // if only contains digits
  } else if(/^\d+$/.test(inputDate)){
    date = new Date(parseInt(inputDate));
  } else {
    date = new Date(inputDate);
    // if date is valid
    if (date == "Invalid Date"){
      ERR = true;
    }
  }
  console.log(date);

  if(ERR){
    res.json({
      error: "Invalid Date"
    })
  } else {
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString()
    });
  }
});
// --------------------------------------

// --------------------------------------
// Request Header Parser Microservice
app.get("/api/whoami", function (req, res) {

  var IP = req.ip;
  var LANG = req.get("accept-language");
  var SOFT = req.get("user-agent");

  res.json({
    ipaddress: IP,
    language: LANG,
    software: SOFT
  })
});
// --------------------------------------

// --------------------------------------
// URL Shortener

var urlArray = [];

// abstract away these functions to create black box
// sorta like a meta API
function addUrl(url) {
  var urlIndex = urlArray.indexOf(url);
  if(urlIndex == -1){
    urlArray.push(url);
    urlIndex = urlArray.indexOf(url);
  }
  return urlIndex;
}

function getUrl(short) {
  return urlArray[short];
}

app.post("/api/shorturl/new", function(req, res) {
  var regexMatch = req.body.url.toString().match(URL_REGEX);

  if(regexMatch == null){
    res.json({
      "error": "invalid url"
    })
  } else {
    var url = req.body.url.toString();
    
    var short_url = addUrl(url);

    res.json({
      "original_url": url,
      "short_url": short_url
    });
  }
});

app.get("/api/shorturl/:short?", function (req, res) {
  const url = getUrl(req.params.short);
  res.redirect(url);
});

// --------------------------------------

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
