export const formatDate = (date: Date): Date | string => {
	if (!date) return '';

	return new Intl.DateTimeFormat('en-GB', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	}).format(date);
};
