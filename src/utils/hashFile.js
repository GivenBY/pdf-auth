const fs = require('fs');
const crypto = require('crypto');

async function hashFile(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);

    stream.on('error', (err) => reject(err));
    hash.on('error', (err) => reject(err));

    stream.on('end', () => {
      resolve(hash.digest('hex'));
    });

    stream.pipe(hash);
  });
}

module.exports = { hashFile };
