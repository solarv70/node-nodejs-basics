import { promises as fs } from 'fs';
import path from 'path';

const renameFile = async () => {
  const oldFilePath = path.join('.', 'wrongFilename.txt');
  const newFilePath = path.join('.', 'properFilename.md');

  try {
    // check file wrongFilename.txt
    await fs.access(oldFilePath);
  } catch (err) {
    console.error('Error: No file!');
    throw new Error('FS operation failed');
  }

  try {
    // Check file properFilename.md
    await fs.access(newFilePath);
    console.error('Error: File already !');
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('Error checking!');
      throw new Error('FS operation failed');
    }
  }

  try {
    // Reneme file
    await fs.rename(oldFilePath, newFilePath);
    console.log('File renamed!');
  } catch (err) {
    console.error('Error rename!', err);
    throw new Error('FS operation failed');
  }
};

// run function
renameFile().catch(err => {
  console.error('error:', err.message);
});