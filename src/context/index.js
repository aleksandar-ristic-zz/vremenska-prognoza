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
const newMessage = {
	type: 'error',
	message: ''
}

export const AppProvider = ({ children }) => {
	const [message, setMessage] = useState(newMessage)
	const [location, setLocation] = useState(newLocation)
	const [unit, setUnit] = useState('metric')
	const [searchText, setSearchText] = useState('')

	const { error: errorCords, coords, handleFetchCoords } = useFetchCoords()

	const {
		loading,
		error: errorData,
		weatherData
	} = useFetchWeather({
		lat: location.lat,
		lon: location.lon,
		unit
	})

	//* uses browsers gps to find location
	const getGeoWeather = useCallback(() => {
		const geoSuccess = position => {
			const gpsLocation = {
				lat: position.coords.latitude,
				lon: position.coords.longitude,
				name: `Lat:${position.coords.latitude} Lon:${position.coords.longitude}`
			}

			setLocation(gpsLocation)
			initApp()
		}

		const geoError = error => {
			setMessage({ type: 'error', message: error.message })
		}

		//* nav turned off
		if (!navigator.geolocation) {
			setMessage({ type: 'error', message: 'Please turn on location.' })
			return
		}

		//* nav promise to get position
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location])

	//* init func
	const initApp = useCallback(() => {
		const savedLocation = getHomeLocation()

		if (savedLocation) {
			const locObj = JSON.parse(savedLocation)
			setLocation(locObj)
			setMessage({
				type: 'success',
				message: `Home location ${locObj.name} found.`
			})
		} else {
			getGeoWeather()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getGeoWeather, location, unit])

	const setHomeWeather = () => {
		if (location.lat && location.lon) {
			setHomeLocation(location)
			setMessage({
				type: 'success',
				message: `Saved ${location.name} as home location.`
			})
		}
	}

	//* toggle between degrees C and F
	const toggleUnit = () => {
		setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'))
		setMessage({ type: 'success', message: `Changed to degrees ${unit}` })
	}

	//* handles search
	const submitNewLocation = async e => {
		e.preventDefault()
		const searchableText = cleanText(searchText)

		if (!searchableText.length) return
		const locObj = await handleFetchCoords({ searchableText, unit })

		if (locObj) {
			setLocation(locObj)
		}
	}

	const resetMessage = () => {
		setMessage(newMessage)
	}

	//* handle buttons onClick
	const handleLocation = e => {
		setLocation(newLocation)
		const savedLocation = getHomeLocation()

		if (e?.id === 'homeLocation') {
			if (savedLocation) {
				const locObj = JSON.parse(savedLocation)
				setLocation(locObj)
				setMessage({
					type: 'success',
					message: `Home location ${locObj.name} found.`
				})
			} else {
				setMessage({
					type: 'error',
					message: `No home location.\n Please save home location first`
				})
			}
		}

		if (e?.id === 'currLocation') {
			getGeoWeather()
		}

		if (e?.id === 'refresh') {
			setMessage({
				type: 'success',
				message: `Location refreshed.`
			})
		}
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
		initApp()
	}, [location, initApp])

	return (
		<AppContext.Provider
			value={{
				loading,
				message,
				unit,
				coords,
				searchText,
				weatherData,
				resetMessage,
				getGeoWeather,
				setSearchText,
				handleLocation,
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
