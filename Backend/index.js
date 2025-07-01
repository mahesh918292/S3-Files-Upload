const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const dotenv = require('dotenv');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

dotenv.config();

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

// Create S3 client using SDK v3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
//   credentials: process.env.AWS_ACCESS_KEY
//     ? {
//         accessKeyId: process.env.AWS_ACCESS_KEY,
//         secretAccessKey: process.env.AWS_SECRET_KEY
//       }
//     : undefined // Use IAM Role Instead of access keys for better security if deploying inside aws
});

// Upload route for multiple files
app.post('/upload', upload.array('file', 10), async (req, res) => {
  const files = req.files;
  const uploadedUrls = [];
  console.log(files)
  try {
    for (const file of files) {
      const fileStream = fs.createReadStream(file.path);
      const s3Key = `${file.originalname}`;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: s3Key,
        Body: fileStream,
        ContentType: file.mimetype
      };

      await s3.send(new PutObjectCommand(uploadParams));
      fs.unlinkSync(file.path); // Delete local temp file

      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
      uploadedUrls.push(fileUrl);
    }

    res.json({ urls: uploadedUrls });
  } catch (error) {
    console.error('S3 Upload Error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
