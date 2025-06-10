import React from 'react'
import { clsx } from 'clsx'
import { Plus, MessageSquare, User, Settings, Menu, X } from 'lucide-react'
import { usePrimaryStore } from '../store'

export const Sidebar: React.FC = () => {
	const { 
		threads, 
		activeThreadId, 
		user,
		sidebarCollapsed,
		setActiveThread, 
		createNewThread,
		toggleSidebar
	} = usePrimaryStore()

	const handleNewChat = () => {
		createNewThread()
	}

	const handleThreadSelect = (threadId: string) => {
		setActiveThread(threadId)
	}

	return (
		<>
			{/* Mobile overlay */}
			{!sidebarCollapsed && (
				<div 
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={toggleSidebar}
				/>
			)}

			{/* Sidebar */}
			<aside className={clsx(
				'bg-zinc-800 border-r border-zinc-700 text-white flex flex-col transition-all duration-300',
				// Mobile: fixed positioning, slide in/out
				'fixed top-0 left-0 h-full z-50 w-80',
				// Desktop: always visible, relative positioning  
				'lg:relative lg:z-auto',
				// Show/hide logic
				sidebarCollapsed 
					? '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden' 
					: 'translate-x-0 lg:w-80'
			)}>
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-zinc-700">
					<h1 className="text-lg font-semibold">T3 Chat</h1>
					<button
						onClick={toggleSidebar}
						className="p-1 rounded hover:bg-zinc-700 lg:hidden"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* New Chat Button */}
				<div className="p-4">
					<button
						onClick={handleNewChat}
						className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-600 hover:border-zinc-500"
					>
						<Plus className="w-4 h-4" />
						<span>New Chat</span>
					</button>
				</div>

				{/* Chat List */}
				<div className="flex-1 overflow-y-auto px-4">
					<div className="space-y-2">
						{threads.map((thread) => (
							<button
								key={thread.id}
								onClick={() => handleThreadSelect(thread.id)}
								className={clsx(
									'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors group',
									activeThreadId === thread.id
										? 'bg-zinc-700 text-white'
										: 'hover:bg-zinc-800 text-zinc-300 hover:text-white'
								)}
							>
								<MessageSquare className="w-4 h-4 flex-shrink-0" />
								<div className="flex-1 min-w-0">
									<div className="font-medium truncate">
										{thread.title}
									</div>
									<div className="text-xs text-zinc-400 truncate">
										{thread.messages.length > 0 
											? thread.messages[thread.messages.length - 1].content.slice(0, 50) + '...'
											: 'No messages yet'
										}
									</div>
								</div>
								<div className="text-xs text-zinc-500 group-hover:text-zinc-400">
									{new Date(thread.updatedAt).toLocaleDateString([], {
										month: 'short',
										day: 'numeric'
									})}
								</div>
							</button>
						))}
					</div>
				</div>

				{/* User Profile Section */}
				<div className="border-t border-zinc-700 p-4">
					<div className="flex items-center gap-3 mb-3">
						<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
							<User className="w-4 h-4 text-white" />
						</div>
						<div className="flex-1 min-w-0">
							<div className="font-medium text-sm truncate">
								{user?.name || 'User'}
							</div>
							<div className="text-xs text-zinc-400 truncate">
								{user?.email}
							</div>
						</div>
					</div>
					
					<button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-300 hover:text-white">
						<Settings className="w-4 h-4" />
						<span className="text-sm">Settings</span>
					</button>
				</div>
			</aside>

			{/* Mobile menu button */}
			<button
				onClick={toggleSidebar}
				className={clsx(
					'fixed top-4 left-4 z-50 p-2 bg-zinc-800 text-white rounded-lg shadow-lg lg:hidden transition-all duration-300',
					!sidebarCollapsed && 'translate-x-80'
				)}
			>
				<Menu className="w-5 h-5" />
			</button>
		</>
	)
}

export default Sidebar
