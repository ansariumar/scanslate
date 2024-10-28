const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { exec } = require('child_process');



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
    
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // exec(`python ocr.py ${req.file.filename}`, async(error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`exec error: ${error}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.error(`stderr: ${stderr}`); 
    //         return;
    //     }

    //     console.log(`stdout: ${stdout}`);
    // })
    spawnTranslation(req.file.filename);
    

    res.status(200).json({ message: 'File uploaded successfully.', image_url:`./../uploads/${req.file.filename}`, path: req.file.path });
    
});

function spawnTranslation(fileName) {
    const child = spawn('python', ['ocr.py', fileName]);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data.toString()}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('error', (error) => {
        console.error(`error: ${error}`);
    });

    child.on('exit', (code, signal) => {
        console.log(`child process exited with code ${code} and signal ${signal}`);
    });
}

module.exports = router;