import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
const { REACT_APP_WEATHER_API_KEY } = process.env

export const useFetchWeather = urlParams => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [weatherData, setWeatherData] = useState(null)

	const { lat, lon, unit } = urlParams
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${unit}&appid=${REACT_APP_WEATHER_API_KEY}`

	const reverseUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${REACT_APP_WEATHER_API_KEY}`

	const fetchWeather = useCallback(async () => {
		setLoading(true)

		const response = await axios(url).catch(error =>
			console.error(error.message)
		)

		const locationName = await axios(reverseUrl).catch(error =>
			console.error(error.message)
		)

		if (response) {
			if (response.status === 200 && locationName.status === 200) {
				setWeatherData({ ...response.data, name: locationName.data[0].name })
			} else {
				setError('There is no current forecast. Please try again later.')
			}
		} else {
			setError('Cannot connect to forecast. Please try again later.')
		}

		setLoading(false)
	}, [url])

	useEffect(() => {
		if (!lat || !lon) return
		fetchWeather()
	}, [fetchWeather, lat, lon])
	console.log(weatherData)

	return { loading, error, weatherData }
}
