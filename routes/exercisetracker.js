// --------------------------------------
// Exercise Tracker

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');


// --------------------------------------
// Mongoose setup

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
})

const User = mongoose.model("User", userSchema)

// --------------------------------------

router.post("/new-user", async (req, res) => {
  
  var username = req.body.username;
  var newUser = new User({
    username: username
  });
  
  try {
  
    var data = await newUser.save()

    res.json({
      username: username,
      _id: data._id
    })

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

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
