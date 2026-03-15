import { extname } from 'node:path';

import { findAfter } from 'unist-util-find-after';
import { visitParents } from 'unist-util-visit-parents';

const isAltTextNode = (node) => node.type === 'text' && node.value.trim().startsWith('//');
const parseAltTextNode = (node) => node.value.trim().replace(/^\/\/\s*/, '');

const isCaptionNode = (node) => node.type === 'text' && node.value.trim().startsWith('^');
const parseCaptionNode = (node) => node.value.trim().replace(/^\^ \s*/, '');

function updateOrientation(img, file) {
	const asset = file.data.astro.frontmatter.images.find(
		({ filename }) => img.properties.src === filename
	);

	img.properties['data-orientation'] ??= asset.orientation;
}

function updateAltAttribute(img, parent, grandparent) {
	let alt = img.properties.alt ?? '';
	const altTextNode = findAfter(parent, img, isAltTextNode);

	if (altTextNode) {
		alt = parseAltTextNode(altTextNode);
		parent.children.splice(parent.children.indexOf(altTextNode), 1);
	} else {
		const paragraph = findAfter(
			grandparent,
			parent,
			({ type, tagName, children }) =>
				type === 'element' && tagName === 'p' && children.length === 1 && isAltTextNode(children[0])
		);

		if (paragraph) {
			const textNode = paragraph.children[0];
			const lines = textNode.value.split('\n');
			const altLine = lines.find((l) => isAltTextNode({ type: 'text', value: l }));
			alt = parseAltTextNode({ type: 'text', value: altLine });
			const remaining = lines
				.filter((l) => l !== altLine)
				.join('\n')
				.trim();
			if (remaining) {
				textNode.value = remaining;
			} else {
				grandparent.children.splice(grandparent.children.indexOf(paragraph), 1);
			}
		}
	}

	img.properties.alt = alt;
}

function transformIntoFigure(img, parent, grandparent) {
	let caption = null;
	const captionNode = findAfter(parent, img, isCaptionNode);

	if (captionNode) {
		caption = parseCaptionNode(captionNode);
		parent.children.splice(parent.children.indexOf(captionNode), 1);
	} else {
		const paragraph = findAfter(
			grandparent,
			parent,
			({ type, tagName, children }) =>
				type === 'element' && tagName === 'p' && children.length === 1 && isCaptionNode(children[0])
		);

		if (paragraph) {
			caption = parseCaptionNode(paragraph.children[0]);
			grandparent.children.splice(grandparent.children.indexOf(paragraph), 1);
		}
	}

	if (!caption) {
		return;
	}

	const index = grandparent.children.indexOf(parent);
	grandparent.children.splice(index, 1, {
		type: 'element',
		tagName: 'figure',
		properties: {},
		children: [
			img,
			{
				type: 'element',
				tagName: 'figcaption',
				properties: {},
				children: [{ type: 'text', value: caption }],
			},
		],
	});
}

export function rehypeRewriteImages() {
	return (tree, file) => {
		if (!file.path || extname(file.path) !== '.md') {
			return;
		}

		visitParents(tree, 'element', (img, ancestors) => {
			if (img.tagName !== 'img') {
				return;
			}

			const parent = ancestors.at(-1);
			const grandparent = ancestors.at(-2);

			updateOrientation(img, file);
			updateAltAttribute(img, parent, grandparent);
			transformIntoFigure(img, parent, grandparent);
		});
	};
}
