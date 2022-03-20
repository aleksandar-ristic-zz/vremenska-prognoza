import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
const { REACT_APP_WEATHER_API_KEY } = process.env

export const useFetchWeather = urlParams => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [weatherData, setWeatherData] = useState(null)

	const { lat, long, units } = urlParams
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&units=${units}&appid=${REACT_APP_WEATHER_API_KEY}`

	const fetchWeather = useCallback(async () => {
		setLoading(true)

		const response = await axios(url).catch(error =>
			console.error(error.message)
		)

		if (response) {
			const data = response.data.results

			if (data.length > 0) {
				setWeatherData(data)
			} else {
				setError('There is no current forecast. Please try again later.')
			}
		} else {
			setError('Cannot connect to forecast. Please try again later.')
		}

		setLoading(false)
	}, [url])

	useEffect(() => {
		fetchWeather()
	}, [fetchWeather])

	return { loading, error, weatherData }
}
