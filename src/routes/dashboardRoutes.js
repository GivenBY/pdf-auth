const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const upload = require('../middleware/upload.js');
const { saveUserFile, getUserFiles } = require('../models/userModel.js');
const fs = require('fs');

router.get('/', authMiddleware, (req, res) => {
  res.sendFile('dashboard.html', { root: './views' });
});


router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });

  saveUserFile(req.session.userId, req.file.originalname, req.file.filename, (err) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    res.json({ success: true, message: 'File uploaded successfully' });
  });
});

router.get('/files', authMiddleware, (req, res) => {
  getUserFiles(req.session.userId, (err, files) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, files });
  });
});

module.exports = router;
