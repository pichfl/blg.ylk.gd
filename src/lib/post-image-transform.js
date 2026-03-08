import fs from 'node:fs';
import path from 'node:path';

export function postImageTransform() {
  return {
    name: 'post-image-transform',
    hooks: {
      'astro:build:generated': ({ dir }) => {
        function processDirectory(dirPath) {
          const items = fs.readdirSync(dirPath, { withFileTypes: true });

          for (const item of items) {
            const fullPath = path.join(dirPath, item.name);

            if (item.isDirectory()) {
              processDirectory(fullPath);
            } else if (item.isFile() && item.name === 'index.html') {
              let content = fs.readFileSync(fullPath, 'utf-8');

              const urlPath = path.relative(dir.pathname, fullPath);
              const pathParts = urlPath.split(path.sep);

              if (pathParts.length >= 3 && pathParts[0].includes('ylkgd')) {
                const postId = pathParts[0].replace(/ylkgd$/, '@ylk.gd');

                content = content.replace(
                  /<img([^>]*?)src="([^"\/][^"]*\.(jpg|jpeg|png|webp|gif|svg))"([^>]*?)>/gi,
                  (match, before, src, ext, after) => {
                    return `<img${before}src="/posts/${postId}/${src}"${after}>`;
                  }
                );

                fs.writeFileSync(fullPath, content, 'utf-8');
              }
            }
          }
        }

        processDirectory(dir.pathname);
      }
    }
  };
}