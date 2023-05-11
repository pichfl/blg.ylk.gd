import { marked } from 'marked';
import stripIndent from 'strip-indent';
import sanitizeHtml from 'sanitize-html';

import { API_HOST } from '../consts';

export function parse(allContent) {
	const contents = [];

	let img;
	let title, id, date;

	for (const content of allContent) {
		const { type = '', value = '' } = content;

		if (type === 'meta') {
			title = content.title;
			id = content.id;
			date = content.date;

			continue;
		}

		if (type.startsWith('image')) {
			const src = `${API_HOST}/${content.src}`;

			img = { type: 'image', src };
			contents.push(img);
		}

		if (type === 'text') {
			if (img && value.startsWith('^ ')) {
				img.caption = value.slice(2);
				img = null;

				continue;
			}

			contents.push(content);
		}
	}

	let type = 'text';

	if (contents.length === 1 && contents[0].type === 'image') {
		type = 'photo';
	} else if (contents.length === 1 && contents[0].value?.trim().startsWith('>')) {
		type = 'quote';
	}

	const html = contents.reduce((result, { type, value, src, caption }) => {
		if (type === 'image') {
			result += stripIndent(`
				<figure>
					<img src="${src}" alt="" />
					${caption ? `<figcaption>${caption}</figcaption>` : ''}
				</figure>
			`);
		}

		if (type === 'text') {
			result += marked.parse(value ?? '', {
				silent: true,
			});
		}

		return result;
	}, '');

	return {
		contents,
		html,
		htmlSanitized: sanitizeHtml(html, {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
		}),
		type,
		title,
		id,
		date: new Date(date),
	};
}
