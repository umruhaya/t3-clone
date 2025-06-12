import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { clsx } from 'clsx'
import { User, Bot } from 'lucide-react'
import { CodeBlock } from './CodeBlock'
import type { ThreadMessage } from '../data/mock'

interface ChatMessageProps {
	message: ThreadMessage
	className?: string
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, className }) => {
	const isUser = message.role === 'user'
	const isAssistant = message.role === 'assistant'

	return (
		<div className={clsx(
			'flex gap-4 p-6 group',
			isUser && 'bg-zinc-800/30',
			isAssistant && 'bg-zinc-900',
			className
		)}>
			{/* Avatar */}
			<div className={clsx(
				'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
				isUser 
					? 'bg-blue-600 text-white' 
					: 'bg-zinc-600 text-white'
			)}>
				{isUser ? (
					<User className="w-4 h-4" />
				) : (
					<Bot className="w-4 h-4" />
				)}
			</div>

			{/* Message content */}
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-2">
					<span className="font-semibold text-sm text-zinc-300">
						{isUser ? 'You' : 'Assistant'}
					</span>
					<span className="text-xs text-zinc-400">
						{new Date(message.timestamp).toLocaleTimeString([], { 
							hour: '2-digit', 
							minute: '2-digit' 
						})}
					</span>
				</div>

				{/* Message content with markdown support */}
				<div className={clsx(
					'prose prose-sm max-w-none',
					'prose-invert',
					'prose-pre:p-0 prose-pre:bg-transparent',
					'prose-code:bg-zinc-800',
					'prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
					'prose-code:before:content-none prose-code:after:content-none'
				)}>
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
						components={{
							// Custom code block renderer
							code(props) {
								const { node, inline, className, children, ...rest } = props as any
								const match = /language-(\w+)/.exec(className || '')
								const language = match ? match[1] : ''

								return !inline ? (
									<CodeBlock 
										language={language}
										className={className}
									>
										{String(children).replace(/\n$/, '')}
									</CodeBlock>
								) : (
									<code className={className} {...rest}>
										{children}
									</code>
								)
							},
							// Style other elements
							blockquote({ children }) {
								return (
									<blockquote className="border-l-4 border-zinc-600 pl-4 py-2 my-4 bg-zinc-800/50 italic">
										{children}
									</blockquote>
								)
							},
							table({ children }) {
								return (
									<div className="overflow-x-auto">
										<table className="min-w-full border-collapse border border-zinc-600">
											{children}
										</table>
									</div>
								)
							},
							th({ children }) {
								return (
									<th className="border border-zinc-600 bg-zinc-800 px-4 py-2 text-left font-semibold">
										{children}
									</th>
								)
							},
							td({ children }) {
								return (
									<td className="border border-zinc-600 px-4 py-2">
										{children}
									</td>
								)
							}
						}}
					>
						{message.content}
					</ReactMarkdown>
				</div>
			</div>
		</div>
	)
}

export default ChatMessage
