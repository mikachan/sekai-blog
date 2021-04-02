export const linkResolver = (doc): string => {
	if (doc.type === 'post') {
		return `/post/${doc.uid}`;
	}
	return '/';
};
