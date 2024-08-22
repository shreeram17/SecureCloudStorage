import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function App() {
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);

  const secretKey = 'your-encryption-key'; // Use a strong, secure key in production

  // Handles file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Encrypt file and save it
  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result;

        // Encrypt the file content
        const encrypted = CryptoJS.AES.encrypt(fileContent, secretKey).toString();
        setEncryptedFile(encrypted);

        console.log('Encrypted file content:', encrypted);
      };

      reader.readAsText(file);
    }
  };

  // Decrypt file content
  const handleDecryptFile = () => {
    if (encryptedFile) {
      const bytes = CryptoJS.AES.decrypt(encryptedFile, secretKey);
      const originalContent = bytes.toString(CryptoJS.enc.Utf8);

      console.log('Decrypted file content:', originalContent);
    }
  };

  return (
    <div className="App">
      <h1>Secure Cloud Storage</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Encrypt and Upload File</button>
      <button onClick={handleDecryptFile}>Decrypt File</button>
    </div>
  );
}

export default App;
