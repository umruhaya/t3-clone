import React, { useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import { usePrimaryStore } from '../store'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import ModelSelector from './ModelSelector'
import TypingIndicator from './TypingIndicator'

export const ChatView: React.FC = () => {
	const { threads, activeThreadId, isTyping } = usePrimaryStore()
	const messagesEndRef = useRef<HTMLDivElement>(null)

	// Find the active thread
	const activeThread = threads.find(thread => thread.id === activeThreadId)

	// Auto-scroll to bottom when new messages are added
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [activeThread?.messages, isTyping])

	return (
		<div className="flex-1 flex flex-col h-screen bg-zinc-900">
			{/* Header */}
			<div className="flex items-center justify-between p-4 border-b border-zinc-700 bg-zinc-800 shadow-sm">
				<div className="flex items-center gap-4">
					<h2 className="text-lg font-semibold text-zinc-100">
						{activeThread?.title || 'New Chat'}
					</h2>
					{activeThread?.messages.length ? (
						<span className="text-sm text-zinc-400 bg-zinc-700 px-2 py-1 rounded-full">
							{activeThread.messages.length} message{activeThread.messages.length !== 1 ? 's' : ''}
						</span>
					) : null}
				</div>
				
				<ModelSelector />
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto">
				{activeThread && activeThread.messages.length > 0 ? (
					<div className="max-w-4xl mx-auto">
						{activeThread.messages.map((message) => (
							<ChatMessage 
								key={message.id} 
								message={message} 
							/>
						))}
						{isTyping && <TypingIndicator />}
						<div ref={messagesEndRef} />
					</div>
				) : (
					// Empty state
					<div className="flex-1 flex items-center justify-center p-8">
						<div className="text-center max-w-md">
							<div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
								<svg 
									className="w-10 h-10 text-white" 
									fill="none" 
									viewBox="0 0 24 24" 
									stroke="currentColor"
								>
									<path 
										strokeLinecap="round" 
										strokeLinejoin="round" 
										strokeWidth={1.5} 
										d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-zinc-100 mb-3">
								Welcome to T3 Chat
							</h3>
							<p className="text-zinc-400 mb-6 leading-relaxed">
								Start a conversation with our AI assistant. Ask questions, get help with coding, 
								or discuss any topic you're curious about.
							</p>
							<div className="grid grid-cols-1 gap-3 text-sm">
								<div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
									<div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
										<svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
										</svg>
									</div>
									<span className="text-zinc-300">Ask coding questions</span>
								</div>
								<div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
									<div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center">
										<svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
										</svg>
									</div>
									<span className="text-zinc-300">Get detailed explanations</span>
								</div>
								<div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
									<div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center">
										<svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
											<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
									<span className="text-zinc-300">Explore new ideas</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Chat Input */}
			<ChatInput />
		</div>
	)
}

export default ChatView
