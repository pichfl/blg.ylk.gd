import onetime from 'onetime';
import { API_HOST } from '../consts.ts';
import { sortBy } from 'lodash-es';
import { dirname } from 'node:path';

export const api = onetime(async () => {
	const response = await fetch(`${API_HOST}content.json`);
	const json = await response.json();

	json.posts = json.posts.map((post) => ({
		...post,
		path: dirname(post.filename),
		date: new Date(post.date),
	}));

	return {
		lastUpdated: json.lastUpdated,
		posts: sortBy(json.posts, (post) => post.date).reverse(),
	};
});
