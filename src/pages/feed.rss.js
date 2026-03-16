import rss from '@astrojs/rss';
import he from 'he';

import { PAGE_SIZE, SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { postSchema } from '../content.config';

export async function GET(context) {
	const importedPosts = import.meta.glob('../content/posts/**/*.md', { eager: true });
	const posts = Object.values(importedPosts)
		.map((post) => ({
			...post,
			data: postSchema.parse(post.frontmatter),
		}))
		.sort((a, b) => b.data.date - a.data.date)
		.slice(0, PAGE_SIZE);

	const items = await Promise.all(
		posts.map(async (post) => {
			const { title, date: pubDate, slug } = post.data;
			const { frontmatter } = post;

			return {
				title: he.encode(he.decode(title || '<untitled>'), { decimal: true }),
				pubDate,
				link: `/${slug}/`,
				description:
					frontmatter.images?.length > 0
						? frontmatter.images.length === 1
							? 'at least one picture'
							: `at least ${frontmatter.images.length} pictures`
						: 'just text',
				content: await post.compiledContent(),
			};
		})
	);

	return rss({
		// TODO: Style feed?
		// stylesheet: '/rss/pretty.xsl',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
