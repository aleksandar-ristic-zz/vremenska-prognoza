import { useState } from 'react'
import axios from 'axios'

const { REACT_APP_WEATHER_API_KEY } = process.env

export const useFetchCoords = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const fetchLocation = async url => {
		setLoading(true)

		const response = await axios(url).catch(error =>
			console.error(error.message)
		)

		if (response) {
			if (response.status === 200) {
				return response.data.coord
			} else {
				setError('Cannot get your location. Please try again later.')
			}
		} else {
			setError('Cannot connect to location data. Please try again later.')
		}
		setLoading(false)
	}

	const handleFetchCoords = async params => {
		const { searchableText, unit } = params
		const regex = /^\d+$/g
		const flag = regex.test(searchableText) ? 'zip' : 'q'
		const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${searchableText}&units=${unit}&appid=${REACT_APP_WEATHER_API_KEY}`
		const encodedUrl = encodeURI(url)

		const data = await fetchLocation(encodedUrl)
		return data
	}

	return { loading, error, handleFetchCoords }
}
