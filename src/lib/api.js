import arrayToChunks from './chunks';
import onetime from 'onetime';
import { parse } from 'node:path';
import { API_HOST } from '../consts.ts';
import { sortBy } from 'lodash-es';
import { parse as parseContent } from './parse-content.js';

export const api = onetime(async () => {
	const response = await fetch(`${API_HOST}/index.json`);
	const files = (await response.json()).filter((file) => file !== 'index.json');
	const chunks = arrayToChunks(files, 5);
	const posts = [];

	for (const chunk of chunks) {
		await Promise.all(
			chunk.map(async (file) => {
				const response = await fetch(`${API_HOST}/${file}`);
				const content = await response.json();
				posts.push({
					path: parse(file).dir,
					content,
					...parseContent(parse(file).dir, content),
				});
			})
		);
	}

	return {
		posts: sortBy(posts, (post) => post.path.replaceAll('/', '')).reverse(),
	};
});
