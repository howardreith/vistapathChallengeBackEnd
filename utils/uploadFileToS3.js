import fs from 'fs';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();
const Bucket = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_ACCESS_KEY_SECRET;
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
});

export default async function uploadFileToS3(file) {
  const fullFileStream = fs.createReadStream(file.path);
  const mainParams = {
    Bucket,
    Key: file.filename,
    Body: fullFileStream,
    ACL: 'public-read',
    ContentType: file.mimetype,
  };
  const mainResult = await s3.upload(mainParams).promise();
  fs.unlinkSync(`${file.path}`);
  return mainResult;
}
