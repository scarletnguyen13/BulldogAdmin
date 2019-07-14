const express = require('express')
const cors = require('cors')
const multer = require('multer');

const server = express();

server.use(express.static('public'))
 
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage })

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

server.post('/upload', upload.single('file'), (req, res) => {
  if (req.file)
    res.json({
      fileURL: `uploads/${req.file.filename}`
    });
  else 
    res.status("409").json("No Files to Upload.");
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log('Server started!')
})