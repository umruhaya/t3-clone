import * as astroEnvs from 'astro:env/server'

export const env = {
	...astroEnvs,
	...import.meta.env,
}

// comment the above and uncomment the below line in order to work around the 'astro:env/server' module not found error while generating types
// export const env = {} as Record<string, any>
