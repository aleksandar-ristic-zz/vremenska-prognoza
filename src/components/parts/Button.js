import { useEffect, useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi'

const Button = ({ id, classes, title, ariaLabel, element, handleFunction }) => {
	const [clicked, setClicked] = useState(false)

	useEffect(() => {
		if (clicked) {
			const timer = setTimeout(() => {
				setClicked(false)
			}, 1000)

			return () => clearTimeout(timer)
		}
	}, [clicked])

	const handleClick = e => {
		setClicked(true)

		if (typeof handleFunction === 'function') {
			handleFunction(e)
		}
	}
	return (
		<button
			id={id}
			className={classes}
			title={title}
			aria-label={ariaLabel}
			onClick={handleClick}
		>
			{clicked ? <HiOutlineRefresh className='spin' /> : element}
		</button>
	)
}

export default Button
