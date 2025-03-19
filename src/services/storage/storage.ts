// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage';
import path from 'path';

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

// Creates a client using Application Default Credentials
const storage = new Storage({
  keyFilename: path.resolve(process.env.GOOGLE_CLOUD_KEYFILE!),
  projectId: process.env.GOOGLE_CLOUD_PROJECT
});

// Creates a client from a Google service account key
// const storage = new Storage({keyFilename: 'key.json'});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// Function to extract base64 data and MIME type
function extractBase64Data(base64String: string) {
  const match = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error('Invalid base64 string format.');
  }
  return {
    mimeType: match[1], // e.g., 'image/png'
    base64Data: match[2] // Pure base64 data
  };
}

export async function createBucket(bucketName: string) {
  // Creates the new bucket
  await storage.createBucket(bucketName);
}

export function getBucket(bucketName: string) {
  const bucket = storage.bucket(bucketName);

  return bucket;
}

export async function uploadFile(bucketName: string, filePath: string, image: { data: string; name: string, type: string }) {
  const bucket = getBucket(bucketName);

  const buffer = Buffer.from(extractBase64Data(image.data).base64Data, 'base64');
  const file = bucket.file(`${filePath}/${image.name}`);

  await file.save(buffer, {
    metadata: {
      contentType: image.type, // Adjust based on your image type
    }
  });

  const publicUrl = `https://storage.googleapis.com/${bucketName}/${filePath}/${image.name}`;

  return publicUrl;
}


