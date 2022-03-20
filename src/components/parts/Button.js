import { useEffect, useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi'

const Button = ({ className, title, ariaLabel, element, ...rest }) => {
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
	}
	return (
		<button
			class={className}
			title={title}
			ariaLabel={ariaLabel}
			{...rest}
			onClick={handleClick}
		>
			{clicked ? <HiOutlineRefresh className='spin' /> : element}
		</button>
	)
}

export default Button
