// @ts-check
import { defineConfig, envField } from 'astro/config'

import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	integrations: [react()],

	vite: {
		plugins: [tailwindcss()],
	},

	output: 'static',

	env: {
		schema: {
			HOST: envField.string({ context: 'server', access: 'public', default: '0.0.0.0' }),
			PORT: envField.number({ context: 'server', access: 'public', default: 8000 }),

			BASE_SERVER_URL: envField.string({ context: 'client', access: 'public', default: '/api' }),

			DATABASE_USERNAME: envField.string({ context: 'server', access: 'secret' }),
			DATABASE_PASSWORD: envField.string({ context: 'server', access: 'secret' }),
			// although these are technically public, ci builds fails as astro env validates public server variables at build time
			// so for convenience they are declared in `secret` context instead of `private`
			DATABASE_HOST: envField.string({ context: 'server', access: 'secret' }),
			DATABASE_NAME: envField.string({ context: 'server', access: 'secret' }),
			DATABASE_PORT: envField.number({ context: 'server', access: 'secret', default: 5432 }),

			KEYFILE_JSON: envField.string({ context: 'server', access: 'secret' }),
			BUCKET_NAME: envField.string({ context: 'server', access: 'secret' }),
		},
	},
})
