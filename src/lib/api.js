import onetime from 'onetime';
import { API_HOST } from '../consts.ts';
import { sortBy } from 'lodash-es';
import { dirname } from 'node:path';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const api = onetime(async () => {
	const response = await fetch(`${API_HOST}content.json`);
	const json = await response.json();

	json.posts = json.posts.map((post) => ({
		...post,
		htmlSanitized: sanitizeHtml(marked(post.content), {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure']),
			allowedAttributes: Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
				img: ['src', 'alt', 'title', 'width', 'height', 'data-*'],
				a: ['href', 'name', 'target'],
				figure: ['class', 'data-*'],
			}),
		}),
		path: dirname(post.filename),
		date: new Date(post.date),
	}));

	return {
		lastUpdated: json.lastUpdated,
		posts: sortBy(json.posts, (post) => post.date).reverse(),
	};
});
