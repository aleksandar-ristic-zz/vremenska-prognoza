import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const { REACT_APP_WEATHER_API_KEY } = process.env

export const useFetchCoords = params => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [coords, setCoords] = useState(null)

	const { searchText, unit } = params
	const regex = /^\d+$/g
	const flag = regex.test(searchText) ? 'zip' : 'q'

	const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${searchText}&units=${unit}&appid=${REACT_APP_WEATHER_API_KEY}`
	const encodedUrl = encodeURI(url)

	const fetchLocation = useCallback(async () => {
		setLoading(true)

		const response = await axios(encodedUrl).catch(error =>
			console.error(error.message)
		)

		if (response) {
			if (response.status === 200) {
				console.log(response)
			} else {
				setError('Cannot get your location. Please try again later.')
			}
		} else {
			setError('Cannot connect to location data. Please try again later.')
		}
		setLoading(false)
	}, [encodedUrl])

	useEffect(() => {
		if (!searchText) return
		fetchLocation()
	}, [fetchLocation, searchText])

	return { loading, error, coords }
}
