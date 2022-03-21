import { useState } from 'react'
import { Nav } from './Nav'
import Button from './parts/Button'
import { MdKeyboardArrowUp } from 'react-icons/md'

export const Footer = () => {
	const [openNav, setOpenNav] = useState(false)

	return (
		<>
			<Button
				classes={`openBtn fade-in ${openNav ? 'show' : ''}`}
				title='Opens app options'
				aria-label='Opens useful options like home location and save location'
				element={<MdKeyboardArrowUp />}
				handleFunction={() => setOpenNav(prevValue => !prevValue)}
			/>
			<Nav show={openNav} />
		</>
	)
}
