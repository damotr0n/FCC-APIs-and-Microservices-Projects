// --------------------------------------
// File Metadata

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

// --------------------------------------
// Mongoose setup

mongoose.connect(process.env.MONGO_URI_FILE_METADATA, { useNewUrlParser: true, useUnifiedTopology: true });

// --------------------------------------


module.exports = router