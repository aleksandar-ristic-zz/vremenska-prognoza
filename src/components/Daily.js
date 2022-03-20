import React from 'react'
import DailyItem from './parts/DailyItem'

export const Daily = () => {
	return (
		<>
			<a href='#daily' className='skip-link'>
				Jump to Daily forecast
			</a>
			<section id='daily' className='DailyWeather fade-in'>
				{/* MAP DAILY ITEMS */}
			</section>
		</>
	)
}
