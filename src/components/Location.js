import React from 'react'
import { useAppContext } from '../context'
import { getFullDate } from '../utils'

export const Location = () => {
	const { weatherData } = useAppContext()

	const { name } = weatherData
	const date = getFullDate()

	return (
		<>
			<a href='#location' className='skip-link'>
				Jump to Location
			</a>
			<section id='location' className='Location fade-in'>
				<h2 className='Location__name'>{name}</h2>
				<h3 className='Location__date'>{date}</h3>
			</section>
		</>
	)
}
