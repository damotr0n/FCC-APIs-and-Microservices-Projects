// --------------------------------------
// File Metadata

const express = require('express')
const router = express.Router()
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// --------------------------------------
// Mongoose setup

// mongooseFileMetadata.createConnection(process.env.MONGO_URI_FILE_METADATA, { useNewUrlParser: true, useUnifiedTopology: true });

// --------------------------------------

router.post("/", upload.single('upfile'), (req, res) => {

  res.json({
    'name': req.file.originalname,
    'type': req.file.mimetype,
    'size': req.file.size
  })

})

module.exports = router