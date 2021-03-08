// --------------------------------------
// Exercise Tracker

var express = require('express')
var router = express.Router()

router.post("/new-user", function (req, res) {
  var username = req.body.username;

  //TODO: add username
  //      return ID

})

router.get("/users", function (req, res) {
  // TODO: return all usernames
  //       as array of objects {username, _id}
})

router.post("/add", function (req, res) {
  var [_id, desc, duration, ...date] = req.body.userId;

  // TODO: add exercise
})
  
router.get("/log", function (req, res) {
  // TODO: get full exectice log
})

module.exports = router
