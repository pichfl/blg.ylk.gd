import { marked } from 'marked';
import stripIndent from 'strip-indent';
import sanitizeHtml from 'sanitize-html';
import { parse as parseDate, parseISO } from 'date-fns';

import { API_HOST } from '../consts';

export function parse(path, allContent) {
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
			const src = `${API_HOST}${content.src}`.replace('jpeg', 'jpg');

			img = { type: 'image', src, width: content.width, height: content.height };

			contents.push(img);

			continue;
		}

		if (type === 'text') {
			if (img && value.startsWith('^ ')) {
				const [caption, ...rest] = value.split('\n');

				img.caption = caption.slice(2);
				img = null;

				content.value = rest.join('\n');

				if (content.value.trim() === '') {
					continue;
				}
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

	const html = contents.reduce((result, { type, value, src, caption, width = 0, height = 0 }) => {
		if (type === 'image') {
			result += stripIndent(`
				<figure ${
					width + height > 0
						? `data-orientation="${width > height ? 'landscape' : 'portrait'}"`
						: ''
				}>
					<img 
						src="${src}" 
						alt=""
						${width ? `width="${width}"` : ''}
						${height ? `height="${height}"` : ''}
					/>
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

	date = date ? parseISO(date) : parseDate(path, 'yyyy/MM/dd/HHmmss', new Date());

	const htmlSanitized = sanitizeHtml(html, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
	});

	return {
		contents,
		date,
		html,
		htmlSanitized,
		id,
		path,
		title,
		type,
	};
}
