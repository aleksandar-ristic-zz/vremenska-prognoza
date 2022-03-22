import Button from './parts/Button'
import { FaHome, FaMapMarkedAlt, FaSave } from 'react-icons/fa'
import { useAppContext } from '../context'
import { getWeatherClass } from '../utils'

export const Nav = ({ show }) => {
	const { weatherData, setHomeWeather, handleLocation } = useAppContext()

	const weather = getWeatherClass(weatherData.current.weather[0].icon)

	return (
		<nav
			className={`optionsContainer ${weather} ${show && 'show'}`}
			style={{ backgroundImage: `url(/img/${weather}.jpg)` }}
		>
			<Button
				id='currLocation'
				classes='button'
				title='Get Location'
				ariaLabel='Gives current weather forecast for this location'
				element={<FaMapMarkedAlt />}
				handleFunction={handleLocation}
			/>
			<Button
				id='saveLocation'
				classes='button'
				title='Save Location'
				ariaLabel='Save your current location as home location'
				element={<FaSave />}
				handleFunction={setHomeWeather}
			/>
			<Button
				id='homeLocation'
				classes='button'
				title='Home Location'
				ariaLabel='Current weather forecast for your home location'
				element={<FaHome />}
				handleFunction={handleLocation}
			/>
		</nav>
	)
}
