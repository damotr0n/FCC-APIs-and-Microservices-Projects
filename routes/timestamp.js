// --------------------------------------
// Timestamp Microservice

var express = require('express')
var router = express.Router()

router.get("/:date?", function (req, res) {
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

module.exports = router
