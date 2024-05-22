const express  = require("express");
const path = require("path")
const multer = require('multer');
const fs = require("fs");

const router = express.Router();
const formData = {

}


// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${req.body.firstName}_${req.body.lastName}-${file.originalname}`; // adding date to make each file unique
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Route for file upload
router.post('/upload', upload.single('file'), (req,  res) => {
 
  setTimeout(() => {    // To replicate the delay of uploading; to show spinner on frontend. 

    if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const filePath = path.join(__dirname, '../', req.file.path);
  return res.status(200).json({ message: 'File uploaded successfully', filePath: filePath })
  }, 2000);

});


router.get('/formData', async (req, res) => {
  // console.log(req);
  const arr = ['products']
   const result = await fetch('https://dummyjson.com/products/category/smartphones')
  .then(res => res.json())
  .then(console.log);
  

  return res.status(200).json(formData);

});
module.exports = router;
