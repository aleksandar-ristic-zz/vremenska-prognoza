import Button from './parts/Button'
import { IoMdRefresh } from 'react-icons/io'

export const Current = () => {
	return (
		<>
			<a href='#current' className='skip-link'>
				Jump to Current Weather
			</a>
			<section id='current' className='CurrentWeather fade-in'>
				<div className='currentTemp'>18°C</div>
				<div className='icon'>Cloud {/* Make cloud */}</div>
				<div className='desc'>Cloudy</div>
				<p className='temp'>22°C / 25°C</p>
				<Button
					title='Click for the most current foreacst'
					ariaLabel='Info about most current weather forecast'
					element={<IoMdRefresh />}
				/>
			</section>
		</>
	)
}
