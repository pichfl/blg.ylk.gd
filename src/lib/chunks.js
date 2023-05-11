function* splitIntoChunks(array, n) {
	for (let i = 0; i < array.length; i += n) {
		yield array.slice(i, i + n);
	}
}

export default function arrayToChunks(array, n = 1) {
	return [...splitIntoChunks(array, n)];
}
