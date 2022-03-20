import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const { REACT_APP_WEATHER_API_KEY } = process.env

export const useFetchCoords = params => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [coords, setCoords] = useState(null)

	const { text, units } = params
	const regex = /^\d+$/g
	const flag = regex.test(text) ? 'zip' : 'q'

	const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${text}&units=${units}&appid=${REACT_APP_WEATHER_API_KEY}`
	const encodedUrl = encodeURI(url)

	const fetchLocation = useCallback(async () => {
		setLoading(true)

		const response = await axios(encodedUrl)

		if (response) {
			const data = response.data.results

			if (data.length > 0) {
				setCoords(data)
			} else {
				setError('Cannot get your location. Please try again later.')
			}
		} else {
			setError('Cannot connect to location data. Please try again later.')
		}
		setLoading(false)
	}, [encodedUrl])

	useEffect(() => {
		fetchLocation()
	}, [fetchLocation])

	return { loading, error, coords }
}
