import React, { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { ChevronDown, Check } from 'lucide-react'
import { usePrimaryStore } from '../store'
import { mockModels } from '../data/mock'

export const ModelSelector: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { selectedModel, setSelectedModel } = usePrimaryStore()
	const dropdownRef = useRef<HTMLDivElement>(null)

	const selectedModelData = mockModels.find(model => model.id === selectedModel)

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleModelSelect = (modelId: string) => {
		setSelectedModel(modelId)
		setIsOpen(false)
	}

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={clsx(
					'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors',
					'border-zinc-600',
					'bg-zinc-700',
					'hover:bg-zinc-600',
					'focus:outline-none focus:ring-2 focus:ring-blue-500',
					'text-sm font-medium'
				)}
			>
				<div className="flex items-center gap-2">
					<div className={clsx(
						'w-2 h-2 rounded-full',
						selectedModelData?.provider === 'OpenAI' && 'bg-green-500',
						selectedModelData?.provider === 'Anthropic' && 'bg-orange-500',
						selectedModelData?.provider === 'Google' && 'bg-blue-500'
					)} />
					<span className="text-zinc-100">
						{selectedModelData?.name || 'Select Model'}
					</span>
				</div>
				<ChevronDown className={clsx(
					'w-4 h-4 text-zinc-500 transition-transform',
					isOpen && 'rotate-180'
				)} />
			</button>

			{/* Dropdown */}
			{isOpen && (
				<div className={clsx(
					'absolute top-full left-0 mt-1 w-64 py-1 rounded-lg border shadow-lg z-50',
					'border-zinc-600',
					'bg-zinc-800'
				)}>
					{mockModels.map((model) => (
						<button
							key={model.id}
							onClick={() => handleModelSelect(model.id)}
							className={clsx(
								'w-full flex items-center gap-3 px-3 py-2 text-left transition-colors',
								'hover:bg-zinc-700',
								selectedModel === model.id && 'bg-blue-900/20'
							)}
						>
							<div className={clsx(
								'w-2 h-2 rounded-full flex-shrink-0',
								model.provider === 'OpenAI' && 'bg-green-500',
								model.provider === 'Anthropic' && 'bg-orange-500',
								model.provider === 'Google' && 'bg-blue-500'
							)} />
							
							<div className="flex-1 min-w-0">
								<div className="font-medium text-zinc-100">
									{model.name}
								</div>
								<div className="text-xs text-zinc-400">
									{model.provider}
								</div>
							</div>

							{selectedModel === model.id && (
								<Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
							)}
						</button>
					))}
				</div>
			)}
		</div>
	)
}

export default ModelSelector
