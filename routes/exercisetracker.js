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

router.get("/users", async (req, res) => {
  
  try {
    
    var data = await User.find();

    res.json(data)

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

})

router.post("/add", function (req, res) {
  var [userId, description, duration, date] = [...Object.values(req.body)];

  // TODO: add exercise
})
  
router.get("/log", function (req, res) {
  // TODO: get full exectice log
})

module.exports = router
