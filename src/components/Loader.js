import Button from './parts/Button'
import DailyItem from './parts/DailyItem'
import { getFullDate } from '../utils'
import { FaCloud } from 'react-icons/fa'

const placeholderItems = [
	{
		temp: { min: 18, max: 36 },
		weather: [{ icon: '01n' }],
		sunrise: 1647967188033
	},
	{
		temp: { min: 18, max: 36 },
		weather: [{ icon: '01n' }],
		sunrise: 1647967188033
	},
	{
		temp: { min: 18, max: 36 },
		weather: [{ icon: '01n' }],
		sunrise: 1647967188033
	}
]

export const Loader = () => {
	const weather = getFullDate()

	return (
		<main className='fog' style={{ backgroundImage: 'url(/img/fog.jpg)' }}>
			<header className='fade-in'>
				<Button
					classes='button'
					title='Loading..'
					ariaLabel='none'
					element={<FaCloud />}
				/>
				<Button
					classes='button'
					title='Loading..'
					ariaLabel='none'
					element={<FaCloud />}
				/>
			</header>

			<section className='Location fade-in'>
				<h2 className='Location__name'>Weatherly App</h2>
				<h3 className='Location__date'>{weather}</h3>
			</section>

			<section className='CurrentWeather fade-in'>
				<div className='icon'>
					<FaCloud />
				</div>
				<div className='desc'>Guessing weather. Maybe:</div>
				<div className='currentTemp'>25°C</div>
				<p className='temp'> Maybe I'll ask fortune teller.</p>

				<Button
					classes='button wait'
					title='Loading..'
					ariaLabel='none'
					element={<FaCloud />}
				/>
			</section>

			<section className='DailyWeather fade-in'>
				{placeholderItems.map((item, index) => (
					<DailyItem key={index} item={item} index={index} unit={'metric'} />
				))}
			</section>

			<Button
				classes='openBtn'
				title='Loading..'
				ariaLabel='none'
				element={<FaCloud />}
			/>
		</main>
	)
}
