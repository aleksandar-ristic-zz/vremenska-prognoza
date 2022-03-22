import { useAppContext } from '../context'
import Button from './parts/Button'
import { IoMdRefresh } from 'react-icons/io'
import { iconToFontAwesome, toProperCase } from '../utils'

export const Current = () => {
	const { weatherData, unit, getHomeWeather } = useAppContext()

	const { temp, feels_like, weather } = weatherData.current
	const degrees = unit === 'metric' ? '°c' : '°f'
	const weatherIcon = iconToFontAwesome(weather[0].icon)

	return (
		<>
			<a href='#current' className='skip-link'>
				Jump to Current Weather
			</a>

			<section id='current' className='CurrentWeather fade-in'>
				<div className='icon'>{weatherIcon}</div>
				<div className='currentTemp'>
					{Math.round(temp)}
					{degrees}
				</div>
				<div className='desc'>{toProperCase(weather[0].description)}</div>
				<p className='temp'>
					<span>feels</span> {Math.round(feels_like)}
					{degrees}
				</p>

				<Button
					id='refresh'
					classes='button'
					title='Click for the most current foreacst'
					ariaLabel='Info about most current weather forecast'
					element={<IoMdRefresh />}
					handleFunction={getHomeWeather}
				/>
			</section>
		</>
	)
}
