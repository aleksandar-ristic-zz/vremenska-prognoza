import React from 'react'
import Button from './parts/Button'
import { FaExchangeAlt } from 'react-icons/fa'
import { HiSearch } from 'react-icons/hi'

export const Header = () => {
	return (
		<header className='fade-in'>
			<div className='searchBar'>
				<label htmlFor='searchBar__text' className='offscreen'>
					Unesite novu lokaciju
				</label>
				<Button
					id='searchButton'
					classes='searchBar__button'
					title='Submit location'
					ariaLabel='Enter zip code, state, or city name to find out weather'
					element={<HiSearch />}
				/>
				<input
					className='searchBar__text'
					name='searchBar__text'
					type='text'
					role='searchbox'
					size='40'
					autoComplete='off'
					placeholder='Name or zip code'
				/>
			</div>
			<Button
				id='toggle'
				classes='button'
				title='Toggle measurement units, degrees'
				ariaLabel='Toggle between celsius and fahrenheit'
				element={<FaExchangeAlt />}
			/>
		</header>
	)
}
