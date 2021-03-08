// --------------------------------------
// URL Shortener

const URL_REGEX = /^https?:\/\/(www\.)?(?<url>[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6})\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

var express = require('express')
var router = express.Router()

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

router.post("/new", function(req, res) {
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

router.get("/:short?", function (req, res) {
  const url = getUrl(req.params.short);
  res.redirect(url);
});

module.exports = router
