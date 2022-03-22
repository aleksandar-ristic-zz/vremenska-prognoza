import Button from './parts/Button'
import DailyItem from './parts/DailyItem'
import { getFullDate } from '../utils'
import { FaCloud } from 'react-icons/fa'

const placeholderItems = [
	{ temp: { min: '18°C', max: '36°C' }, weather: [{ icon: '01n' }] }
]

export const Loader = () => {
	const weather = getFullDate()

	return (
		<main className='fade-in'>
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

			<section className='location'>
				<h2>Weatherly App</h2>
				<h3>{weather}</h3>
			</section>

			<section className='CurrenWeather fade-in'>
				<div className='icon'>
					<FaCloud />
				</div>
				<div className='currentTemp'>25°C</div>
				<div className='desc'></div>
				<p className='temp'>feels a lot</p>
			</section>

			<section className='DailyWeather fade-in'>
				{placeholderItems.map((item, index) => (
					<DailyItem key={index} item={item} index={index} />
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
