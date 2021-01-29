import { server } from '@test/refile.mock'
import { RefileClient } from '@src/refile-client'
import { TOKEN } from '@test/utils'
import * as path from 'path'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('RefileClient', () => {
  it('uplodatFile(file: Blob | string): Promise<void>', async () => {
    const client = createClient()

    const result = client.uploadFile(path.join(__dirname, './fixtures/file.txt'))
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('getFileInfo(hash: string): Promise<RefileClientRequestOptions>', async () => {
    const client = createClient()
    const hash = 'hash'

    const result = client.getFileInfo(hash)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toEqual({
      hash: 'hash'
    , location: null
    , references: 0
    })
  })

  it('setReference(namespace: string, itemId: string, fileHash: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const itemId = 'id'
    const fileHash = 'hash'

    const result = client.setReference(namespace, itemId, fileHash)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeReference(namespace: string, itemId: string, fileHash: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const itemId = 'id'
    const fileHash = 'hash'

    const result = client.removeReference(namespace, itemId, fileHash)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeReferencesByItem(namespace: string, itemId: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const itemId = 'id'

    const result = client.removeReferencesByItem(namespace, itemId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('getAllNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getAllNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toEqual(['namespace'])
  })

  it('getAllItemIds(namespace: string): Promise<string[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getAllItemIds(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toEqual(['id'])
  })

  it('listFilesByItem(namespace: string, itemId: string): Promise<string[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const itemId = 'id'

    const result = client.listFilesByItem(namespace, itemId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toEqual(['hash'])
  })

  it('listItemsByFile(fileHash: string, namespace: string): Promise<string[]>', async () => {
    const client = createClient()
    const fileHash = 'hash'
    const namespace = 'namespace'

    const result = client.listItemsByFile(fileHash, namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toEqual(['id'])
  })
})

function createClient() {
  return new RefileClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
