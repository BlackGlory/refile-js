import { buildServer } from '@test/blacklist.mock.js'
import { BlacklistClient } from '@src/blacklist-client.js'
import { ADMIN_PASSWORD, startService, stopService, getAddress } from '@test/utils.js'

beforeAll(() => startService(buildServer))
afterAll(stopService)

describe('BlacklistClient', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test('add(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.add(namespace)

    expect(result).toBeUndefined()
  })

  test('remove(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.remove(namespace)

    expect(result).toBeUndefined()
  })
})

function createClient() {
  return new BlacklistClient({
    server: getAddress()
  , adminPassword: ADMIN_PASSWORD
  })
}
