// --------------------------------------
// Request Header Parser Microservice

var express = require('express')
var router = express.Router()

router.get("/", function (req, res) {

  var IP = req.ip;
  var LANG = req.get("accept-language");
  var SOFT = req.get("user-agent");

  res.json({
    ipaddress: IP,
    language: LANG,
    software: SOFT
  })
});

module.exports = router
