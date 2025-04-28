import { promises as fs } from 'fs';
import path from 'path';

const create = async () => {
  const dirPath = path.join('.', 'files');
  const filePath = path.join(dirPath, 'fresh.txt');

  try {
    // check folder 
    await fs.mkdir(dirPath, { recursive: true });

    // check file
    try {
      await fs.access(filePath);
      throw new Error('FS operation failed'); // error if file allready
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Make file
        await fs.writeFile(filePath, 'I am fresh and young');
        console.log('Make file');
      } else {
        throw err; // error
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

await create();