import { useStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

type ThreadMessage = {
	id: string
	type: 'reasoning' | 'text' | 'image'
	role: 'user' | 'assistant'
	content: string // in case of `image` type it would be image url, otherwise it would be plain text.
}

type Thread = {
	id: string
	messages: ThreadMessage[]
}

type PrimaryStore = {
	thread: Thread
}

const initialPrimaryStore: PrimaryStore = {
	thread: { id: '', messages: [] },
}

export const primaryStore = createStore<PrimaryStore>()(
	devtools(
		persist(
			immer((set, get) => initialPrimaryStore),
			{
				name: 'global-storage',
				// mention all the state properties to be persisted to local storage here
				partialize: (state) => ({}),
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
