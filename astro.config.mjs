// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { rehypeRewriteImages } from './src/lib/rehype-rewrite-images.js';

const site = 'https://blg.ylk.gd';

// https://astro.build/config
export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	output: 'static',
	site,
	integrations: [mdx(), sitemap()],
	markdown: {
		rehypePlugins: [rehypeRewriteImages],
	},
	experimental: {
		rustCompiler: true,
  },
  build: {
    assetsPrefix: site,
	},
});
