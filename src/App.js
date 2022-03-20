import Button from './components/parts/Button'
import { Header, Location, Current, Daily, Nav } from './components'
import { MdKeyboardArrowUp } from 'react-icons/md'

function App() {
	return (
		<main className='rain'>
			<h1 className='offscreen'>Weather Forecast</h1>
			<Header />
			<Location />
			<Current />
			<Daily />
			<Button
				className='openBtn show fade-in'
				title='Opens app options'
				aria-label='Opens useful options like home location and save location'
				element={<MdKeyboardArrowUp />}
			/>
			<Nav />
		</main>
	)
}

export default App
