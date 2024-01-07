const express = require('express');
const app = express();
app.use(express.json());

function encryptString(str) {
  let encrypted = '';
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    let encryptedCharCode = (charCode + 13) % 256;
    encrypted += String.fromCharCode(encryptedCharCode);
  }
  return encrypted;
}

app.get('/api/get-env', (req, res) => {
  // Retrieve the secret code from environment variables
  const secretCode = process.env.SECRET_CODE;

  if (!secretCode) {
    return res.status(404).json({ error: 'Secret code not found in environment variables' });
  }

  // Encrypt the secret code
  const encryptedSecret = encryptString(secretCode);

  // Send the encrypted secret code as a response
  return res.status(200).json({ secret: encryptedSecret });
});

module.exports = app;
