import fs from 'node:fs';
import path from 'node:path';

function copyImages() {
  const postsDir = path.join(process.cwd(), 'posts');
  const publicDir = path.join(process.cwd(), 'public', 'posts');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  if (!fs.existsSync(postsDir)) return;

  const postFolders = fs.readdirSync(postsDir);

  for (const folder of postFolders) {
    const folderPath = path.join(postsDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const targetDir = path.join(publicDir, folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
        const srcPath = path.join(folderPath, file);
        const destPath = path.join(targetDir, file);

        if (!fs.existsSync(destPath) || fs.statSync(srcPath).mtime > fs.statSync(destPath).mtime) {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
  }
}

export function copyPostImages() {
  return {
    name: 'copy-post-images',
    hooks: {
      'astro:config:setup': () => {
        copyImages();
      },
      'astro:build:setup': () => {
        copyImages();
      }
    }
  };
}