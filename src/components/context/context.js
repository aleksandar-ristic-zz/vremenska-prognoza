import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const AppProvider = children => {
	return <AppContext.Provider value={{ try: 'hello' }}></AppContext.Provider>
}

export const useAppContext = () => {
	return useContext(AppContext)
}
