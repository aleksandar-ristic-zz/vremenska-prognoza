export const getHomeLocation = () => localStorage.getItem('defwl')

export const setHomeLocation = location =>
	localStorage.setItem(JSON.stringify(location))

export const cleanText = text => {
	const regex = / {2,}/g
	const entryText = text.replaceAll(regex, ' ').trim()

	return entryText
}
