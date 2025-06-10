import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Copy, Check } from 'lucide-react'
import { clsx } from 'clsx'

interface CodeBlockProps {
	children: string
	language?: string
	className?: string
}

// Custom dark theme for syntax highlighting
const customDarkTheme = {
	'code[class*="language-"]': {
		color: '#f8f8f2',
		background: 'none',
		fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
		fontSize: '0.875rem',
		textAlign: 'left' as const,
		whiteSpace: 'pre' as const,
		wordSpacing: 'normal',
		wordBreak: 'normal' as const,
		wordWrap: 'normal' as const,
		lineHeight: '1.5',
		tabSize: 4,
		hyphens: 'none' as const,
	},
	'pre[class*="language-"]': {
		color: '#f8f8f2',
		background: '#1e1e1e',
		fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
		fontSize: '0.875rem',
		textAlign: 'left' as const,
		whiteSpace: 'pre' as const,
		wordSpacing: 'normal',
		wordBreak: 'normal' as const,
		wordWrap: 'normal' as const,
		lineHeight: '1.5',
		tabSize: 4,
		hyphens: 'none' as const,
		padding: '1rem',
		margin: '0',
		overflow: 'auto',
		borderRadius: '0 0 0.5rem 0.5rem',
	},
	comment: { color: '#6272a4' },
	prolog: { color: '#6272a4' },
	doctype: { color: '#6272a4' },
	cdata: { color: '#6272a4' },
	punctuation: { color: '#f8f8f2' },
	'.namespace': { opacity: '0.7' },
	property: { color: '#ff79c6' },
	tag: { color: '#ff79c6' },
	constant: { color: '#bd93f9' },
	symbol: { color: '#bd93f9' },
	deleted: { color: '#ff5555' },
	boolean: { color: '#bd93f9' },
	number: { color: '#bd93f9' },
	selector: { color: '#50fa7b' },
	'attr-name': { color: '#50fa7b' },
	string: { color: '#f1fa8c' },
	char: { color: '#f1fa8c' },
	builtin: { color: '#8be9fd' },
	inserted: { color: '#50fa7b' },
	variable: { color: '#f8f8f2' },
	operator: { color: '#ff79c6' },
	entity: { color: '#f8f8f2', cursor: 'help' },
	url: { color: '#f8f8f2' },
	'.language-css .token.string': { color: '#f1fa8c' },
	'.style .token.string': { color: '#f1fa8c' },
	atrule: { color: '#ff79c6' },
	'attr-value': { color: '#f1fa8c' },
	keyword: { color: '#ff79c6' },
	function: { color: '#50fa7b' },
	'class-name': { color: '#8be9fd' },
	regex: { color: '#f1fa8c' },
	important: { color: '#ff79c6', fontWeight: 'bold' },
	bold: { fontWeight: 'bold' },
	italic: { fontStyle: 'italic' },
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
	children, 
	language = 'text',
	className 
}) => {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(children)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy code:', err)
		}
	}

	// Extract language from className if provided (for react-markdown compatibility)
	const extractedLanguage = className?.replace('language-', '') || language

	return (
		<div className="relative group">
			<div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-sm">
				<span className="text-zinc-400 font-mono">
					{extractedLanguage}
				</span>
				<button
					onClick={handleCopy}
					className={clsx(
						'flex items-center gap-2 px-2 py-1 rounded text-xs transition-colors',
						'hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
						copied 
							? 'text-green-400' 
							: 'text-zinc-400 hover:text-zinc-200'
					)}
				>
					{copied ? (
						<>
							<Check className="w-3 h-3" />
							Copied!
						</>
					) : (
						<>
							<Copy className="w-3 h-3" />
							Copy
						</>
					)}
				</button>
			</div>
			<SyntaxHighlighter
				language={extractedLanguage}
				style={customDarkTheme}
				customStyle={{
					margin: 0,
					borderRadius: '0 0 0.5rem 0.5rem',
					fontSize: '0.875rem',
					lineHeight: '1.5',
				}}
				showLineNumbers={children.split('\n').length > 5}
				wrapLines={true}
				wrapLongLines={true}
			>
				{children}
			</SyntaxHighlighter>
		</div>
	)
}

export default CodeBlock
