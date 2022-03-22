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
			setMessage({ type: 'error', message: 'Please turn on geolocation.' })
			return
		}

		//* nav promise to get position
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
	}, [location])

	const getHomeWeather = useCallback(
		e => {
			// check in local storage
			const savedLocation = getHomeLocation()

			// if saved loc and either clicked home or init app
			if (
				(savedLocation && !e) ||
				(savedLocation && e?.id === 'homeLocation')
			) {
				const locObj = JSON.parse(savedLocation)
				setLocation(locObj)
				setMessage({
					type: 'success',
					message: `Home location ${locObj.name} found.`
				})
			}

			// if no saved loc but init app or clicked current loc
			if ((!savedLocation && !e) || e?.id === 'currLocation')
				return getGeoWeather()

			if (e?.id === 'refresh') {
				setLocation(newLocation)
				setMessage({
					type: 'success',
					message: `Location refreshed.`
				})
				return
			}

			// no home loc but home clicked
			if (!savedLocation && e?.id === 'homeLocation') {
				setMessage({
					type: 'error',
					message: `No home location.\n Please save home location first`
				})
				return
			}
		},
		[getGeoWeather, location, unit]
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
		setMessage({ type: 'success', message: `Changed to degrees ${unit}` })
	}

	const submitNewLocation = async e => {
		e.preventDefault()
		const searchableText = cleanText(searchText)

		if (!searchableText.length) return
		setSearchText(searchableText)
	}

	const resetMessage = () => {
		setMessage(newMessage)
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
				resetMessage,
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
