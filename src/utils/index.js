import { format } from 'date-fns'

import {
	BsSun,
	BsFillMoonStarsFill,
	BsFillCloudSunFill,
	BsFillCloudMoonFill,
	BsFillCloudsFill,
	BsCloudSnow,
	BsCloudLightningRain,
	BsCloudFog2Fill,
	BsPatchQuestion
} from 'react-icons/bs'

import {
	FaCloudMoonRain,
	FaCloudSunRain,
	FaPooStorm,
	FaCloudMeatball
} from 'react-icons/fa'

export const getHomeLocation = () => localStorage.getItem('defwl')

export const setHomeLocation = location =>
	localStorage.setItem(JSON.stringify(location))

export const cleanText = text => {
	const regex = / {2,}/g
	const entryText = text.replaceAll(regex, ' ').trim()

	return entryText
}

export const toProperCase = text => {
	const words = text.split(' ')
	const properWords = words.map(word => {
		return word.charAt(0).toUpperCase() + word.slice(1)
	})

	return properWords.join(' ')
}

export const getDay = () => {
	const dateObj = format(new Date(), 'ccc')

	return dateObj
}

export const getFullDate = () => {
	const dateObj = format(new Date(), 'PPPP')

	return dateObj
}

export const getWeatherClass = icon => {
	const firstTwoChars = icon.slice(0, 2)
	const lastChar = icon.slice(2)

	const weatherLookup = {
		'09': 'snow',
		10: 'rain',
		11: 'rain',
		13: 'snow',
		50: 'fog'
	}

	let weatherClass
	if (weatherLookup[firstTwoChars]) {
		weatherClass = weatherLookup[firstTwoChars]
	} else if (lastChar === 'd') {
		weatherClass = 'clouds'
	} else {
		weatherClass = 'night'
	}

	return weatherClass
}

export const iconToFontAwesome = icon => {
	const firstTwoChars = icon.slice(0, 2)
	const lastChar = icon.slice(2)
	let i

	switch (firstTwoChars) {
		case '01':
			if (lastChar === 'd') {
				i = <BsSun />
			} else {
				i = <BsFillMoonStarsFill />
			}
			break
		case '02':
			if (lastChar === 'd') {
				i = <BsFillCloudSunFill />
			} else {
				i = <BsFillCloudMoonFill />
			}
			break
		case '03':
			i = <BsFillCloudsFill />
			break
		case '04':
			i = <FaCloudMeatball />
			break
		case '09':
			i = <BsCloudLightningRain />
			break
		case '10':
			if (lastChar === 'd') {
				i = <FaCloudSunRain />
			} else {
				i = <FaCloudMoonRain />
			}
			break
		case '11':
			i = <FaPooStorm />
			break
		case '13':
			i = <BsCloudSnow />
			break
		case '50':
			i = <BsCloudFog2Fill />
			break
		default:
			i = <BsPatchQuestion />
	}

	return i
}
