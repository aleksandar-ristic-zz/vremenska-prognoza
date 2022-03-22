# Weatherly App

Weather forecast app, uses [openweathermap]('https://openweathermap.org/api')
API for data. Frontend made in ReactJS.

![Night Theme](/weatherly_app.png)

## Technology used

Nothing fancy, just basics.

- ReactJS library for managing and displaying data
- Axios for fetch calls
- date-fns for formating dates
- react-icons for svg representing buttons and conditions

## Enviromental variables

Only one, named REACT_APP_WEATHER_API_KEY

## App start in development

```
npm i && npm start
```

Will install dependencies and start app. If you are using Linux and get error:

```
sudo npm i && npm start
```

## Features

- using geolocation to get latitude and longitude
- using API to get latitude and longitude from name or zip code
- searching by name and zip code and getting forecast
- saving current location as home location
- getting data for current location
- getting data for home location
- themes based on classes and css variables

## Made with

- React hooks
  - createContext
  - useContext
  - useState
  - useEffect
  - useCallback
- Custom hooks
  - useFetchWeather
    -- Gets weather data and location name
  - useFetchCoords
    -- Gets latitude and longitude based on location name or zip code
- Scss and css for visual upgrade of data
- HTML as apps base, which holds everything

## Credits

Thanks to openweather for being free and allowing so much, and dribble for
giving me an idea.
Cannot publish as openweather uses htttp, so app cannot make fetch calls
