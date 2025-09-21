const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController.js');
const upload = require('../middleware/upload.js');

router.post('/register', upload.single('file'),register);
router.post('/login',upload.single('file'), login);

module.exports = router;
