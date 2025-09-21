const { hashFile } = require('../utils/hashFile.js');
const { createUser, findUserByHash } = require('../models/userModel.js');
const fs = require('fs');

exports.register = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const pdfHash = await hashFile(file.path);

    createUser(pdfHash, (err, userId) => {
      fs.unlink(file.path, () => {});

      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return res.status(400).json({ success: false, error: 'PDF already registered' });
        }
        return res.status(500).json({ success: false, error: err.message });
      }

      res.json({ success: true, message: 'Registration successful', userId });
    });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No PDF uploaded' });
    }

    const pdfHash = await hashFile(file.path);

    findUserByHash(pdfHash, (err, user) => {
      fs.unlink(file.path, () => {});

      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      if (!user) {
        return res.status(401).json({ success: false, error: 'PDF not recognized' });
      }
      req.session.userId = user.id;

      res.json({ success: true, message: 'Login successful via PDF', user });
    });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};
