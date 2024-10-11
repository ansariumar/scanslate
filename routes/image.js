const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, './../img/uploads');
        cb(null, uploadsDir); // Set uploads folder
    },
    filename: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, './../img/uploads');
        const originalName = file.originalname;

        const uniqueFileName = generateUniqueFileName(uploadsDir, originalName);

        cb(null, uniqueFileName); // Pass the unique file name to multer
    }
});

const generateUniqueFileName = (directory, originalName) => {
    let fileName = originalName;
    let filePath = path.join(directory, fileName);
    let fileExtension = path.extname(originalName);  // Get file extension
    let fileBaseName = path.basename(originalName, fileExtension);  // Get file base name
    let counter = 1;

    // Check if file exists and generate a new name if it does
    while (fs.existsSync(filePath)) {
        fileName = `${fileBaseName}-${counter}${fileExtension}`;  // Append a counter to the file name
        filePath = path.join(directory, fileName);  // Update file path
        counter += 1;  // Increment counter
    }

    return fileName;  // Return the new file name
};

const upload = multer({ storage: storage });


router.post('/', upload.single('cropped_image'), (req, res) => {
    console.log("called")
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileBuffer = req.file.buffer;

    const filePath = path.join(__dirname,'..', 'img', 'uploads', req.file.originalname);

    res.status(200).json({ message: 'File uploaded successfully.', image_url:`./../uploads/${req.file.filename}` });
    
    
});



module.exports = router;