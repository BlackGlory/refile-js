import { buildServer } from '@test/whitelist.mock'
import { WhitelistClient } from '@src/whitelist-client'
import { ADMIN_PASSWORD, startService, stopService, getAddress } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => startService(buildServer))
afterAll(stopService)

describe('whitelist', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  test('add(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.add(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('remove(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.remove(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new WhitelistClient({
    server: getAddress()
  , adminPassword: ADMIN_PASSWORD
  })
}
