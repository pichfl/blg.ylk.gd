import rss from '@astrojs/rss';
import { api } from '../lib/api.js';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { format, formatISO } from 'date-fns';
import sanitizeHtml from 'sanitize-html';
import truncate from 'minimal-utf8-truncate';

const maxDescriptionLength = 120;

export async function get(context) {
	const { posts } = await api();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => {
			const description = sanitizeHtml(post.htmlSanitized, {
				allowedTags: [],
				allowedAttributes: {},
			})
				.replaceAll(/\s+/g, ' ')
				.trim();

			return {
				title: post.title ?? format(post.date, 'dd/MM/yyyy HH:mm'),
				pubDate: formatISO(post.date),
				description:
					description.length > maxDescriptionLength
						? `${truncate(description, maxDescriptionLength - 1).trim()}…`
						: description,
				customData: '',
				link: `/${post.path}`,
				content: post.htmlSanitized,
			};
		}),
	});
}
