import { buildServer } from '@test/token.mock'
import { TokenClient } from '@src/token-client'
import { ADMIN_PASSWORD, startService, stopService, getAddress } from '@test/utils'

beforeAll(() => startService(buildServer))
afterAll(stopService)

describe('TokenClient', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test(`
    getTokens(namespace: string): Promise<Array<{
      token: string
      write: boolean
      read: boolean
    }>>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.getTokens(namespace)

    expect(result).toStrictEqual([{
      token: 'token'
    , write: true
    , read: false
    , delete: false
    }])
  })

  test('addWriteToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.addWriteToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test('removeWriteToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.removeWriteToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test('addReadToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.addReadToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test('removeReadToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.removeReadToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test('addDeleteToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.addDeleteToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test('removeDeleteToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.removeDeleteToken(namespace, token)

    expect(result).toBeUndefined()
  })
})

function createClient() {
  return new TokenClient({
    server: getAddress()
  , adminPassword: ADMIN_PASSWORD
  })
}
