import fse from 'fs-extra';
import path from 'path';

const topDir = process.cwd(); // Working directory
const tinymceSource = path.join(topDir, 'node_modules', 'tinymce');
const tinymceDest = path.join(topDir, 'public', 'tinymce');

// Ensure destination is empty or remove it
fse.removeSync(tinymceDest); // Removes directory if it exists

// Ensure destination directory is created
fse.ensureDirSync(path.join(topDir, 'public'));

// Copy TinyMCE to the public folder
fse.copySync(tinymceSource, tinymceDest, { overwrite: true });
