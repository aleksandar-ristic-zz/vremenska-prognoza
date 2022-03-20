import React from 'react'
import Button from './parts/Button'
import { FaToggleOn } from 'react-icons/fa'
import { HiOutlineSearch } from 'react-icons/hi'

export const Header = () => {
	return (
		<header className='fade-in'>
			<div className='searchBar'>
				<label for='searchBar__text' className='offscreen'>
					Unesite novu lokaciju
				</label>
				<Button
					className='searchBar__button'
					title='Submit location'
					ariaLabel='Enter zip code, state, or city name to find out weather'
					element={<HiOutlineSearch />}
					name='searchBar__button'
				/>
				<input
					className='searchBar__text'
					type='text'
					role='searchbox'
					size='40'
					autocomplete='off'
					placeholder='...'
				/>
			</div>
			<Button
				className='button'
				title='Toggle measurement units, degrees'
				ariaLabel='Toggle between celsius and fahrenheit'
				element={FaToggleOn}
			/>
		</header>
	)
}
