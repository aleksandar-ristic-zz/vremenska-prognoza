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
	localStorage.setItem('defwl', JSON.stringify(location))

//* checks if text has 2 or more spaces, and cleans that
export const cleanText = text => {
	const regex = / {2,}/g
	const entryText = text.replaceAll(regex, ' ').trim()
	return entryText
}

//* capitalizes first letter in a string
export const toProperCase = text => {
	const words = text.split(' ')
	const properWords = words.map(word => {
		return word.charAt(0).toUpperCase() + word.slice(1)
	})

	return properWords.join(' ')
}

//* parses given date into day in a week Mon, Tue...
export const getDay = date => {
	const fixDate = parseInt(date + '000')
	const day = format(new Date(fixDate), 'ccc')
	return day
}

//* parses given date into full date Tuesday, March 22nd 2022
export const getFullDate = () => {
	const dateObj = format(new Date(), 'PPPP')
	return dateObj
}

//* parses given icon code into string usable as class, or img
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
		weatherClass = 'sun'
	} else {
		weatherClass = 'night'
	}

	return weatherClass
}

//* parses icon code into font awesome icon
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
