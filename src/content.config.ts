import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { format } from 'date-fns';

export const postSchema = z
	.object({
		title: z.string(),
		date: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		slug: z.string().default(''),
		assets: z
			.array(
				z.object({
					filename: z.string(),
					width: z.number(),
					height: z.number(),
					orientation: z.enum(['portrait', 'landscape', 'square']),
				})
			)
			.optional(),
	})
	.transform((value) => {
		value.slug = format(value.date, 'yyyy-MM-dd-HHmm');
		return value;
	});

const post = defineCollection({
	loader: glob({
		base: './src/content/posts',
		pattern: '**/message.md',
		generateId: ({ entry }) => entry.split('/')[0],
	}),

	schema: () => postSchema,
});

export const collections = { post };
