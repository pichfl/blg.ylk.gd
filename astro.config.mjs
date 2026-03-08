// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { copyPostImages } from './src/lib/copy-post-images.js';
import { postImageTransform } from './src/lib/post-image-transform.js';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://blg.ylk.gd',
  integrations: [
    copyPostImages(),
    postImageTransform(),
    mdx({
      components: {
        img: './src/components/Img.astro'
      }
    }),
    sitemap()
  ]
});
