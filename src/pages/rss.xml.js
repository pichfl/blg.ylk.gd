import rss from '@astrojs/rss';
import { api } from '../lib/api.js';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { format, formatISO } from 'date-fns';
import sanitizeHtml from 'sanitize-html';

export async function get(context) {
	const { posts } = await api();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.title ?? format(post.date, 'dd/MM/yyyy HH:mm'),
			pubDate: formatISO(post.date),
			description: sanitizeHtml(post.htmlSanitized, {
				allowedTags: [],
				allowedAttributes: {},
			})
				.trim()
				.replaceAll(/\s+/g, ' '),
			customData: '',
			link: `/${post.path}`,
			content: post.htmlSanitized,
		})),
	});
}
