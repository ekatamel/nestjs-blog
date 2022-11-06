import * as fs from 'fs';

export const fileToBuffer = (filename) => {
  const readStream = fs.createReadStream(filename);
  const chunks = [];
  return new Promise((resolve, reject) => {
    // Handle any errors while reading
    readStream.on('error', (err) => {
      // handle error

      // File could not be read
      reject(err);
    });

    // Listen for data
    readStream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    // File is done being read
    readStream.on('close', () => {
      // Create a buffer of the image from the stream
      resolve(Buffer.concat(chunks));
    });
  });
};
