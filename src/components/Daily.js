import React from 'react'
import DailyItem from './parts/DailyItem'
import { useAppContext } from '../context'

export const Daily = () => {
	const { weatherData, unit } = useAppContext()

	return (
		<>
			<a href='#daily' className='skip-link'>
				Jump to Daily forecast
			</a>
			<section id='daily' className='DailyWeather fade-in'>
				{weatherData?.daily.map((item, index) => (
					<DailyItem key={index} item={item} unit={unit} index={index} />
				))}
			</section>
		</>
	)
}
