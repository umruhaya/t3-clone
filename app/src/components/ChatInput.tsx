import React, { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { Send, Paperclip, Square } from 'lucide-react'
import { usePrimaryStore } from '../store'

interface ChatInputProps {
	onSend?: (message: string) => void
	disabled?: boolean
	placeholder?: string
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
	onSend,
	disabled = false,
	placeholder = "Message..."
}) => {
	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const { activeThreadId, addMessage, createNewThread, setIsTyping } = usePrimaryStore()

	// Auto-resize textarea
	useEffect(() => {
		const textarea = textareaRef.current
		if (textarea) {
			textarea.style.height = 'auto'
			textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
		}
	}, [message])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		if (!message.trim() || disabled || isLoading) return

		const messageContent = message.trim()
		setMessage('')
		setIsLoading(true)
		setIsTyping(true)

		try {
			// If no active thread, create a new one
			let threadId = activeThreadId
			if (!threadId) {
				threadId = createNewThread()
			}

			// Add user message
			addMessage(threadId, {
				type: 'text',
				role: 'user',
				content: messageContent,
				timestamp: new Date().toISOString()
			})

			// Simulate AI response (in a real app, this would be an API call)
			setTimeout(() => {
				const responses = [
					"I understand your question. Let me help you with that.",
					"That's an interesting point. Here's what I think...",
					"I'd be happy to help you with that. Let me provide some information.",
					"Great question! Here's a detailed explanation...",
					"I can help you solve this problem. Let me break it down step by step."
				]
				
				const randomResponse = responses[Math.floor(Math.random() * responses.length)]
				
				addMessage(threadId!, {
					type: 'text',
					role: 'assistant',
					content: randomResponse,
					timestamp: new Date().toISOString()
				})
				
				setIsLoading(false)
				setIsTyping(false)
			}, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds

			// Call optional onSend callback
			onSend?.(messageContent)
		} catch (error) {
			console.error('Error sending message:', error)
			setIsLoading(false)
			setIsTyping(false)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSubmit(e)
		}
	}

	const handleStop = () => {
		setIsLoading(false)
		setIsTyping(false)
	}

	return (
		<div className="border-t border-zinc-700 bg-zinc-800 p-4">
			<form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
				<div className={clsx(
					'relative flex items-end gap-3 p-3 rounded-lg border transition-colors',
					'border-zinc-600',
					'bg-zinc-700',
					'focus-within:border-blue-400',
					disabled && 'opacity-50'
				)}>
					{/* Attachment button */}
					<button
						type="button"
						disabled={disabled || isLoading}
						className={clsx(
							'flex-shrink-0 p-2 rounded-md transition-colors',
							'text-zinc-400 hover:text-zinc-200',
							'hover:bg-zinc-600',
							'disabled:opacity-50 disabled:cursor-not-allowed'
						)}
						title="Attach file"
					>
						<Paperclip className="w-4 h-4" />
					</button>

					{/* Text input */}
					<textarea
						ref={textareaRef}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						disabled={disabled || isLoading}
						className={clsx(
							'flex-1 resize-none bg-transparent border-0 outline-none',
							'text-zinc-100',
							'placeholder:text-zinc-400',
							'disabled:cursor-not-allowed',
							'min-h-[20px] max-h-[200px] py-2'
						)}
						rows={1}
					/>

					{/* Send/Stop button */}
					{isLoading ? (
						<button
							type="button"
							onClick={handleStop}
							className={clsx(
								'flex-shrink-0 p-2 rounded-md transition-colors',
								'bg-zinc-600 hover:bg-zinc-700 text-white',
								'focus:outline-none focus:ring-2 focus:ring-zinc-500'
							)}
							title="Stop generating"
						>
							<Square className="w-4 h-4" />
						</button>
					) : (
						<button
							type="submit"
							disabled={!message.trim() || disabled}
							className={clsx(
								'flex-shrink-0 p-2 rounded-md transition-colors',
								'focus:outline-none focus:ring-2 focus:ring-blue-500',
								message.trim() && !disabled
									? 'bg-blue-600 hover:bg-blue-700 text-white'
									: 'bg-zinc-300 dark:bg-zinc-600 text-zinc-500 dark:text-zinc-400 cursor-not-allowed'
							)}
							title="Send message"
						>
							<Send className="w-4 h-4" />
						</button>
					)}
				</div>

				{/* Helper text */}
				<div className="flex items-center justify-between mt-2">
					<p className="text-xs text-zinc-500 dark:text-zinc-400">
						Press Enter to send, Shift+Enter for new line
					</p>
					{isLoading && (
						<div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
							<div className="w-3 h-3 border border-zinc-300 dark:border-zinc-600 border-t-transparent rounded-full animate-spin"></div>
							AI is thinking...
						</div>
					)}
				</div>
			</form>
		</div>
	)
}

export default ChatInput
