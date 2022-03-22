import { iconToFontAwesome, getDay } from '../../utils'

const DailyItem = ({ item, unit, index }) => {
	const { temp, weather, sunrise } = item

	const weatherIcon = iconToFontAwesome(weather[0].icon)
	const day = index === 0 ? 'Today' : getDay(sunrise)
	const degrees = unit === 'metric' ? '°c' : '°f'

	return (
		<div className={`dailyItem ${index === 0 ? 'active' : ''} `}>
			<div className='icon'>{weatherIcon}</div>
			<p className='temp'>{`${Math.round(temp.min)}${degrees} / ${Math.round(
				temp.max
			)}${degrees}`}</p>
			<p className='day'>{day}</p>
		</div>
	)
}

export default DailyItem
