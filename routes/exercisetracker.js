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

const exerciseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date
})
const Exercise = mongoose.model("Exercise", exerciseSchema)

// --------------------------------------

router.post("/new-user", async (req, res) => {

  console.log("-------------")
  console.log("-----NEW-----")
  console.log("Request:")
  console.log(req.body)
  
  var username = req.body.username;
  var newUser = new User({
    username: username
  });
  
  try {
  
    var data = await newUser.save()

    const resJson = {
      username: username,
      _id: data._id
    }

    console.log("Response:")
    console.log(resJson);

    res.json(resJson)

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

router.post("/add", async (req, res) => {
  console.log("-------------")
  console.log("-----ADD-----")
  console.log("Request:")
  console.log(req.body)

  var [userId, description, duration, date] = [...Object.values(req.body)];

  if (!date) {
    date = new Date()
  } else {
    date = new Date(date)
  }

  var newExercise = new Exercise({
    userId: userId,
    description: description,
    duration: duration,
    date: date
  })

  try {

    var user = await User.findOne({_id: userId})
    await newExercise.save()

    const resJson = {
      username: user.username,
      description: description,
      duration: parseInt(duration),
      _id: userId,
      date: date.toString().slice(0, 15)
    };

    console.log("Response:")
    console.log(resJson);

    res.json(resJson)

  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }

})
  
router.get("/log", await (req, res) => {
  console.log("-------------")
  console.log("-----ADD-----")
  console.log("Request:")
  console.log(req.body)

  var [userId, fromDate, toDate, limit] = [...Object.values(req.body)]

  try {

  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }

})

module.exports = router
