import { useEffect } from 'react'
import { useAppContext } from '../../context'

const Message = () => {
	const { message, resetMessage } = useAppContext()

	useEffect(() => {
		if (message.message) {
			const timer = setTimeout(() => {
				resetMessage()
			}, 5000)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [message])

	return (
		message.message && (
			<p className={`message ${message.type}`}>{message.message}</p>
		)
	)
}

export default Message
