import { buildServer } from '@test/client.mock.js'
import { RefileClient } from '@src/client.js'
import { TOKEN, startService, stopService, getAddress } from '@test/utils.js'
import { fileURLToPath } from 'url'

beforeAll(() => startService(buildServer))
afterAll(stopService)

describe('RefileClient', () => {
  test('uploadFile(file: Blob | string): Promise<void>', async () => {
    const client = createClient()

    const result = await client.uploadFile(
      fileURLToPath(new URL('./fixtures/file.txt', import.meta.url))
    )

    expect(result).toBeUndefined()
  })

  test('getFileInfo(hash: string): Promise<RefileClientRequestOptions>', async () => {
    const client = createClient()
    const hash = 'hash'

    const result = await client.getFileInfo(hash)

    expect(result).toEqual({
      hash: 'hash'
    , location: null
    , references: 0
    })
  })

  describe('getFileLocation(hash: string): Promise<string | undefined>', () => {
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

  test('setReference(namespace: string, id: string, fileHash: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'
    const fileHash = 'hash'

    const result = await client.setReference(namespace, id, fileHash)

    expect(result).toBeUndefined()
  })

  test('removeReference(namespace: string, id: string, fileHash: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'
    const fileHash = 'hash'

    const result = await client.removeReference(namespace, id, fileHash)

    expect(result).toBeUndefined()
  })

  test('removeReferencesByItem(namespace: string, id: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'

    const result = await client.removeReferencesByItem(namespace, id)

    expect(result).toBeUndefined()
  })

  test('removeReferencesByNamespace(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.removeReferencesByNamespace(namespace)

    expect(result).toBeUndefined()
  })

  test('getAllNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = await client.getAllNamespaces()

    expect(result).toEqual(['namespace'])
  })

  test('getAllItemIds(namespace: string): Promise<string[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.getAllItemIds(namespace)

    expect(result).toEqual(['id'])
  })

  test('getFileHashesByItem(namespace: string, id: string): Promise<string[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'

    const result = await client.getFileHashesByItem(namespace, id)

    expect(result).toEqual(['hash'])
  })

  test('getItemIdsByFile(fileHash: string, namespace: string): Promise<string[]>', async () => {
    const client = createClient()
    const fileHash = 'hash'
    const namespace = 'namespace'

    const result = await client.getItemIdsByFile(fileHash, namespace)

    expect(result).toEqual(['id'])
  })

  test('collectGarbage(): Promise<void>', async () => {
    const client = createClient()

    const result = await client.collectGarbage()

    expect(result).toBeUndefined()
  })
})

function createClient() {
  return new RefileClient({
    server: getAddress()
  , token: TOKEN
  })
}
