import { useEffect, useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi'

const Button = ({ classes, title, ariaLabel, element, handleFunction }) => {
	const [clicked, setClicked] = useState(false)

	useEffect(() => {
		if (clicked) {
			const timer = setTimeout(() => {
				setClicked(false)
			}, 1000)

			return () => clearTimeout(timer)
		}
	}, [clicked])

	const handleClick = () => {
		setClicked(true)

		if (typeof handleFunction === 'function') {
			handleFunction()
		}
	}
	return (
		<button
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
