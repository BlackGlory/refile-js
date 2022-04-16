import { buildServer } from '@test/token-policy.mock'
import { TokenPolicyClient } from '@src/token-policy-client'
import { ADMIN_PASSWORD, startService, stopService, getAddress } from '@test/utils'

beforeAll(() => startService(buildServer))
afterAll(stopService)

describe('TokenPolicyClient', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test(`
    get(namespace: string): Promise<{
      writeTokenRequired: boolean | null
      readTokenRequired: boolean | null
    }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.get(namespace)

    expect(result).toStrictEqual({
      writeTokenRequired: true
    , readTokenRequired: false
    , deleteTokenRequired: null
    })
  })

  test('setWriteTokenRequired(namespace: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const val = true

    const result = await client.setWriteTokenRequired(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeWriteTokenRequired(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.removeWriteTokenRequired(namespace)

    expect(result).toBeUndefined()
  })

  test('setReadTokenRequired(namespace: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const val = true

    const result = await client.setReadTokenRequired(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeReadTokenRequired(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.removeReadTokenRequired(namespace)

    expect(result).toBeUndefined()
  })

  test('setDeleteTokenRequired(namespace: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const val = true

    const result = await client.setDeleteTokenRequired(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeDeleteTokenRequired(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.removeDeleteTokenRequired(namespace)

    expect(result).toBeUndefined()
  })
})

function createClient() {
  return new TokenPolicyClient({
    server: getAddress()
  , adminPassword: ADMIN_PASSWORD
  })
}
