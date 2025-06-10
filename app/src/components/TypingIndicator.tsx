import React from 'react'
import { clsx } from 'clsx'
import { Bot } from 'lucide-react'

export const TypingIndicator: React.FC = () => {
	return (
		<div className="flex gap-4 p-6 bg-white dark:bg-zinc-900">
			{/* Avatar */}
			<div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-zinc-600 text-white">
				<Bot className="w-4 h-4" />
			</div>

			{/* Typing animation */}
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-2">
					<span className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">
						Assistant
					</span>
				</div>

				<div className="flex items-center gap-1 py-2">
					<div className="flex gap-1">
						<div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
						<div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
						<div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
					</div>
					<span className="text-sm text-zinc-500 dark:text-zinc-400 ml-2">
						AI is thinking...
					</span>
				</div>
			</div>
		</div>
	)
}

export default TypingIndicator
