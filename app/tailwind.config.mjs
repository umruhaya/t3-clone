/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			typography: {
				invert: {
					css: {
						'--tw-prose-body': 'rgb(228 228 231)',
						'--tw-prose-headings': 'rgb(250 250 250)',
						'--tw-prose-lead': 'rgb(161 161 170)',
						'--tw-prose-links': 'rgb(96 165 250)',
						'--tw-prose-bold': 'rgb(250 250 250)',
						'--tw-prose-counters': 'rgb(161 161 170)',
						'--tw-prose-bullets': 'rgb(82 82 91)',
						'--tw-prose-hr': 'rgb(39 39 42)',
						'--tw-prose-quotes': 'rgb(250 250 250)',
						'--tw-prose-quote-borders': 'rgb(39 39 42)',
						'--tw-prose-captions': 'rgb(161 161 170)',
						'--tw-prose-code': 'rgb(250 250 250)',
						'--tw-prose-pre-code': 'rgb(228 228 231)',
						'--tw-prose-pre-bg': 'rgb(39 39 42)',
						'--tw-prose-th-borders': 'rgb(82 82 91)',
						'--tw-prose-td-borders': 'rgb(63 63 70)',
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
