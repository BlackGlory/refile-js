import nodeFetch from 'node-fetch'

export const fetch = nodeFetch as any as typeof globalThis.fetch
