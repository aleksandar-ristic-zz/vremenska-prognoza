import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback
} from 'react'
import { getHomeLocation, setHomeLocation, cleanText } from '../utils'
import { useFetchCoords } from '../hooks/use-fetch-coords'
import { useFetchWeather } from '../hooks/use-fetch-weather'

const AppContext = createContext()

const newLocation = {
	name: 'Location',
	lat: null,
	lon: null
}

export const AppProvider = ({ children }) => {
	const [message, setMessage] = useState({ type: 'error', message: '' })
	const [location, setLocation] = useState(newLocation)
	const [unit, setUnit] = useState('metric')
	const [searchText, setSearchText] = useState('')

	const { error: errorCords, coords } = useFetchCoords(
		searchText,
		location.unit
	)

	const {
		loading,
		error: errorData,
		weatherData
	} = useFetchWeather({
		lat: location.lat,
		lon: location.lon,
		unit
	})

	const getGeoWeather = useCallback(() => {
		const geoSuccess = position => {
			const newLocation = {
				lat: position.coords.latitude,
				lon: position.coords.longitude,
				name: `Lat:${position.coords.latitude} Lon:${position.coords.longitude}`
			}

			setLocation(newLocation)
			getHomeWeather()
		}

		const geoError = error => {
			setMessage({ type: 'error', message: error.message })
		}

		//* nav turned off
		if (!navigator.geolocation) {
			setMessage({ type: 'error', message: 'Geolocation not supported' })
			return
		}

		//* nav promise to get position
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
	}, [location])

	const getHomeWeather = useCallback(
		e => {
			const savedLocation = getHomeLocation()

			if (!savedLocation && !e) return getGeoWeather()
			if (!savedLocation && e.type === 'click') {
				setMessage({
					type: 'error',
					message:
						'No home location saved.Please save your home location first.'
				})
			}
			if (savedLocation) {
				const locObj = JSON.parse(savedLocation)
				setLocation(locObj)
			}
		},
		[getGeoWeather, location]
	)

	const setHomeWeather = () => {
		if (location.lat && location.lon) {
			setHomeLocation(location)
			setMessage({
				type: 'success',
				message: `Saved ${location.name} as home location.`
			})
		}
	}

	const toggleUnit = () => {
		setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'))
	}

	const submitNewLocation = async e => {
		e.preventDefault()
		const searchableText = cleanText(searchText)

		if (!searchableText.length) return
		setSearchText(searchableText)
	}

	useEffect(() => {
		if (errorCords || errorData) {
			setMessage({
				type: 'error',
				message: errorCords ? errorCords : errorData
			})
		}
	}, [errorCords, errorData])

	useEffect(() => {
		if (location.lat && location.lon) return
		getHomeWeather()
	}, [getHomeWeather, location])

	return (
		<AppContext.Provider
			value={{
				loading,
				message,
				unit,
				coords,
				weatherData,
				setMessage,
				getGeoWeather,
				getHomeWeather,
				setHomeWeather,
				toggleUnit,
				submitNewLocation
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => {
	return useContext(AppContext)
}
