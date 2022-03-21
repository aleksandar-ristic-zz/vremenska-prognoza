import { useEffect } from 'react'

const Message = ({ message, setMessage }) => {
	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				setMessage({})
			}, 5000)

			return clearTimeout(timer)
		}
	})

	return (
		message && <p className={`message ${message.type}`}>{message.message}</p>
	)
}

export default Message
