import React from 'react'
import { useAppContext } from '../context'
import { getFullDate } from '../utils'

export const Location = () => {
	const { weatherData, loading } = useAppContext()

	if (!weatherData || loading) {
		return <section className='location fade-in'></section>
	}

	const { name } = weatherData
	const date = getFullDate()

	return (
		<>
			<a href='#location' className='skip-link'>
				Jump to Location
			</a>
			<section id='location' className='location fade-in'>
				<h2 className='location__name'>{name}</h2>
				<h3 className='location__date'>{date}</h3>
			</section>
		</>
	)
}
