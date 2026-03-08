import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const post = defineCollection({
	loader: glob({ base: './posts', pattern: '**/*.{md}' }),

	schema: ({ image }) =>
		z.object({
			title: z.string(),
		}),
});

export default post;
