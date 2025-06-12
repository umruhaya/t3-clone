import { useStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'
import { mockThreads, mockUser, mockModels, type Thread, type ThreadMessage, type User } from '../data/mock'

type PrimaryStore = {
	// User data
	user: User | null
	
	// Thread management
	threads: Thread[]
	activeThreadId: string | null
	
	// UI state
	selectedModel: string
	sidebarCollapsed: boolean
	isTyping: boolean
	
	// Actions
	setActiveThread: (threadId: string | null) => void
	setSelectedModel: (modelId: string) => void
	toggleSidebar: () => void
	setIsTyping: (isTyping: boolean) => void
	addMessage: (threadId: string, message: Omit<ThreadMessage, 'id'>) => void
	createNewThread: () => string
}

const initialPrimaryStore: PrimaryStore = {
	user: mockUser,
	threads: mockThreads,
	activeThreadId: mockThreads[0]?.id || null,
	selectedModel: mockModels[0]?.id || 'gpt-4o',
	sidebarCollapsed: false, // Always start with sidebar open
	isTyping: false,
	
	setActiveThread: (threadId) => {
		// Implementation will be added in the store creation
	},
	setSelectedModel: (modelId) => {
		// Implementation will be added in the store creation
	},
	toggleSidebar: () => {
		// Implementation will be added in the store creation
	},
	setIsTyping: (isTyping) => {
		// Implementation will be added in the store creation
	},
	addMessage: (threadId, message) => {
		// Implementation will be added in the store creation
	},
	createNewThread: () => {
		// Implementation will be added in the store creation
		return ''
	},
}

export const primaryStore = createStore<PrimaryStore>()(
	devtools(
		persist(
			immer((set, get) => ({
				...initialPrimaryStore,
				
				setActiveThread: (threadId) => set((state) => {
					state.activeThreadId = threadId
				}),
				
				setSelectedModel: (modelId) => set((state) => {
					state.selectedModel = modelId
				}),
				
				toggleSidebar: () => set((state) => {
					state.sidebarCollapsed = !state.sidebarCollapsed
				}),
				
				setIsTyping: (isTyping) => set((state) => {
					state.isTyping = isTyping
				}),
				
				addMessage: (threadId, message) => set((state) => {
					const thread = state.threads.find((t: Thread) => t.id === threadId)
					if (thread) {
						const newMessage: ThreadMessage = {
							...message,
							id: `msg-${Date.now()}`,
							timestamp: new Date().toISOString()
						}
						thread.messages.push(newMessage)
						thread.updatedAt = new Date().toISOString()
						
						// Update thread title if it's the first user message and title is still "New Chat"
						if (thread.title === 'New Chat' && message.role === 'user' && thread.messages.length === 1) {
							const firstWords = message.content.split(' ').slice(0, 6).join(' ')
							thread.title = firstWords.length > 50 ? firstWords.slice(0, 50) + '...' : firstWords
						}
					}
				}),
				
				createNewThread: () => {
					const newThreadId = `thread-${Date.now()}`
					set((state) => {
						const newThread: Thread = {
							id: newThreadId,
							userId: state.user?.id || 'user-1',
							title: 'New Chat',
							messages: [],
							createdAt: new Date().toISOString(),
							updatedAt: new Date().toISOString()
						}
						state.threads.unshift(newThread)
						state.activeThreadId = newThreadId
					})
					return newThreadId
				}
			})),
			{
				name: 'global-storage',
				// mention all the state properties to be persisted to local storage here
				partialize: (state) => ({
					threads: state.threads,
					activeThreadId: state.activeThreadId,
					selectedModel: state.selectedModel,
					sidebarCollapsed: state.sidebarCollapsed
				}),
			},
		),
	),
)

// export store functions for Astro components to call
const { getState, getInitialState, subscribe, setState } = primaryStore
export { getInitialState, getState, setState, subscribe }

/**
 * @see https://docs.pmnd.rs/zustand/guides/typescript#bounded-usestore-hook-for-vanilla-stores
 */
export function usePrimaryStore(): PrimaryStore
export function usePrimaryStore<T>(selector: (state: PrimaryStore) => T): T
export function usePrimaryStore<T>(selector?: (state: PrimaryStore) => T) {
	return useStore(primaryStore, selector!)
}
