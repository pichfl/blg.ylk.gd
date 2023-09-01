import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
	adapter: vercel(),
	integrations: [sitemap()],
	output: 'static',
	site: 'https://blg.ylk.gd',
});
