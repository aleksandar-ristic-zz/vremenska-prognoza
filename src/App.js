import { useEffect } from 'react'
import Message from './components/parts/Message'
import { Header, Location, Current, Daily, Footer, Loader } from './components'
import { useAppContext } from './context'
import { getWeatherClass } from './utils'

function App() {
	const { weatherData, loading } = useAppContext()

	useEffect(() => {
		document.body.style.backgroundImage = 'url(/img/bg_main.jpg)'
	}, [])

	if (!weatherData || loading) {
		return <Loader />
	}

	const weather = getWeatherClass(weatherData.current.weather[0].icon)

	return (
		<main
			className={weather}
			style={{ backgroundImage: `url(/img/${weather}.jpg)` }}
		>
			<h1 className='offscreen'>Weather Forecast</h1>
			<Message />
			<Header />
			<Location />
			<Current />
			<Daily />
			<Footer />
		</main>
	)
}

export default App
