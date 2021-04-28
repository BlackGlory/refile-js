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

  it('setReference(namespace: string, id: string, fileHash: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'
    const fileHash = 'hash'

    const result = client.setReference(namespace, id, fileHash)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeReference(namespace: string, id: string, fileHash: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'
    const fileHash = 'hash'

    const result = client.removeReference(namespace, id, fileHash)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeReferencesByItem(namespace: string, id: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'

    const result = client.removeReferencesByItem(namespace, id)
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

  it('getFileHashesByItem(namespace: string, id: string): Promise<string[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'

    const result = client.getFileHashesByItem(namespace, id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toEqual(['hash'])
  })

  it('getItemIdsByFile(fileHash: string, namespace: string): Promise<string[]>', async () => {
    const client = createClient()
    const fileHash = 'hash'
    const namespace = 'namespace'

    const result = client.getItemIdsByFile(fileHash, namespace)
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
