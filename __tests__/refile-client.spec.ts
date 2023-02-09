import { buildServer } from '@test/refile-client.mock.js'
import { RefileClient } from '@src/refile-client.js'
import { startService, stopService, getAddress } from '@test/utils.js'
import { fileURLToPath } from 'url'

beforeAll(() => startService(buildServer))
afterAll(stopService)

describe('RefileClient', () => {
  test('uploadFile', async () => {
    const client = createClient()

    const result = await client.uploadFile(
      fileURLToPath(new URL('./fixtures/file.txt', import.meta.url))
    )

    expect(result).toBeUndefined()
  })

  test('getFileInfo', async () => {
    const client = createClient()
    const hash = 'hash'

    const result = await client.getFileInfo(hash)

    expect(result).toEqual({
      hash: 'hash'
    , location: null
    , references: 0
    })
  })

  describe('getFileLocation', () => {
    describe('200', () => {
      it('returns string', async () => {
        const client = createClient()
        const hash = 'exist'

        const result = await client.getFileLocation(hash)

        expect(result).toBe('location')
      })
    })

    describe('404', () => {
      it('returns undefined', async () => {
        const client = createClient()
        const hash = 'not-exist'

        const result = await client.getFileLocation(hash)

        expect(result).toBeUndefined()
      })
    })
  })

  test('setReference', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'
    const fileHash = 'hash'

    const result = await client.setReference(namespace, id, fileHash)

    expect(result).toBeUndefined()
  })

  test('removeReference', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'
    const fileHash = 'hash'

    const result = await client.removeReference(namespace, id, fileHash)

    expect(result).toBeUndefined()
  })

  test('removeReferencesByItemId', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'

    const result = await client.removeReferencesByItemId(namespace, id)

    expect(result).toBeUndefined()
  })

  test('removeReferencesByNamespace', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.removeReferencesByNamespace(namespace)

    expect(result).toBeUndefined()
  })

  test('getAllNamespaces', async () => {
    const client = createClient()

    const result = await client.getAllNamespaces()

    expect(result).toEqual(['namespace'])
  })

  test('getAllItemIds', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.getAllItemIds(namespace)

    expect(result).toEqual(['id'])
  })

  test('getFileHashesByItemId', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'

    const result = await client.getFileHashesByItemId(namespace, id)

    expect(result).toEqual(['hash'])
  })

  test('getItemIdsByFile', async () => {
    const client = createClient()
    const fileHash = 'hash'
    const namespace = 'namespace'

    const result = await client.getItemIdsByFileHash(fileHash, namespace)

    expect(result).toEqual(['id'])
  })

  test('collectGarbage', async () => {
    const client = createClient()

    const result = await client.collectGarbage()

    expect(result).toBeUndefined()
  })
})

function createClient() {
  return new RefileClient({ server: getAddress() })
}
