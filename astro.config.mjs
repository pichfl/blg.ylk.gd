// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { rehypeRewriteImages } from './src/lib/rehype-rewrite-images.js';

// https://astro.build/config
export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	output: 'static',
	site: 'https://blg.ylk.gd',
	integrations: [mdx(), sitemap()],
	markdown: {
		rehypePlugins: [rehypeRewriteImages],
	},
	experimental: {
		rustCompiler: true,
	},
});
