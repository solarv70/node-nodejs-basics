import { promises as fs } from 'fs';
import path from 'path';

const renameFile = async () => {
  const oldFilePath = path.join('.', 'wrongFilename.txt');
  const newFilePath = path.join('.', 'properFilename.md');

  try {
    // check file wrongFilename.txt
    await fs.access(oldFilePath);
  } catch {
    throw new Error('FS operation failed'); // If no file
  }

  try {
    // check file properFilename.md
    await fs.access(newFilePath);
    throw new Error('FS operation failed'); // File allready
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw new Error('FS operation failed'); // No file
    }
  }

  // rename file
  await fs.rename(oldFilePath, newFilePath);
  console.log('File renamed!');
};

await renameFile();