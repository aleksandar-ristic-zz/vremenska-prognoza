import Button from './parts/Button'
import { FaHome, FaMapMarkedAlt, FaSave } from 'react-icons/fa'

export const Nav = () => {
	return (
		<nav className='optionsContainer show rain'>
			<Button
				className='button'
				title='Get Location'
				ariaLabel='Gives current weather forecast for this location'
				element={<FaMapMarkedAlt />}
			/>
			<Button
				className='button'
				title='Save Location'
				ariaLabel='Save your current location as home location'
				element={<FaSave />}
			/>
			<Button
				className='button'
				title='Home Location'
				ariaLabel='Current weather forecast for your home location'
				element={<FaHome />}
			/>
		</nav>
	)
}
