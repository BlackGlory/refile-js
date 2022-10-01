import { buildServer } from './blacklist-manager.mock.js'
import { BlacklistManager } from '@manager/blacklist-manager.js'
import { ADMIN_PASSWORD, startService, stopService, getAddress } from '@test/utils.js'

beforeAll(() => startService(buildServer))
afterAll(stopService)

describe('BlacklistManager', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createManager()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test('add(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.add(namespace)

    expect(result).toBeUndefined()
  })

  test('remove(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.remove(namespace)

    expect(result).toBeUndefined()
  })
})

function createManager() {
  return new BlacklistManager({
    server: getAddress()
  , adminPassword: ADMIN_PASSWORD
  })
}
