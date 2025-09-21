const db = require('../config/db');

function createUser(pdfHash, callback) {
  const stmt = db.prepare('INSERT INTO users (pdf_hash) VALUES (?)');
  stmt.run(pdfHash, function(err) {
    callback(err, this.lastID);
  });
}

function findUserByHash(pdfHash, callback) {
  db.get('SELECT * FROM users WHERE pdf_hash = ?', [pdfHash], (err, row) => {
    callback(err, row);
  });
}

function saveUserFile(userId, filename, filePath, callback) {
  const stmt = db.prepare('INSERT INTO user_files (user_id, filename, file_path) VALUES (?, ?, ?)');
  stmt.run(userId, filename, filePath, function(err) {
    callback(err);
  });
}

function getUserFiles(userId, callback) {
  db.all('SELECT * FROM user_files WHERE user_id = ?', [userId], (err, rows) => {
    callback(err, rows);
  });
}

module.exports = {
  createUser,
  findUserByHash,
  saveUserFile,
  getUserFiles
};
