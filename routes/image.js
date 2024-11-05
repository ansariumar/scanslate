const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('node:fs');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, './../img/uploads');
        cb(null, uploadsDir); // Set uploads folder
    },
    filename: (req, file, cb) => {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;

        cb(null, uniqueFileName); // Pass the unique file name to multer
    }
});


const upload = multer({ storage: storage });


router.post('/', upload.single('cropped_image'), async (req, res) => {
    let extractedText;

    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    console.time("test_timer");

    callOcr(req.file.filename);

    console.timeEnd("test_timer");


    extractedText = fs.readFileSync('E:/Projects/scanslatePY/translation.txt', 'utf8');

    res.status(200).json({ message: 'File uploaded successfully.', image_url:`./../uploads/${req.file.filename}`, path: req.file.path, extractedText: extractedText });
    
    
});

function callOcr(filename) {
    const result = spawnSync('python', ['ocr.py', filename]);
  
    if (result.error) {
        console.error('Error:', result.error);
    } else {
        // console.log('Output:', result.stdout);
        // console.error('Error Output:', result.stderr);
    }
}



module.exports = router;