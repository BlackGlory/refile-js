import { fetch } from 'extra-fetch'
import { NotFound } from '@blackglory/http-status'
import { post, put, get, del, IRequestOptionsTransformer } from 'extra-request'
import { url, appendPathname, searchParams, signal, formDataField, keepalive, basicAuth, header }
  from 'extra-request/transformers/index'
import { ok, toJSON, toText } from 'extra-response'
import { getHashInfo } from '@utils/get-hash-info.js'
import { getFile } from '@utils/get-file.js'
import { raceAbortSignals, timeoutSignal } from 'extra-abort'
import { Falsy } from 'justypes'
import { expectedVersion } from '@src/utils.js'

interface IFileInfo {
  hash: string
  location: string | null
  references: number
}

export interface IRefileClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

export interface IRefileClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

export interface IRefileClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export class RefileClient {
  constructor(private options: IRefileClientOptions) {}

  private getCommonTransformers(
    options: IRefileClientRequestOptions
  ): Array<IRequestOptionsTransformer | Falsy> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth

    return [
      url(this.options.server)
    , auth && basicAuth(auth.username, auth.password)
    , token && searchParams({ token })
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , (options.keepalive ?? this.options.keepalive) && keepalive()
    , header('Accept-Version', expectedVersion)
    ]
  }

  /**
   * @throws {AbortError}
   */
  async uploadFile(
    blobOrFilename: Blob | string
  , options: IRefileClientRequestOptionsWithoutToken = {}
  ): Promise<void> {
    const { hash, hashList } = await getHashInfo(blobOrFilename)

    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/refile/files/${hash}`)
    , formDataField('hash', hashList)
    , formDataField('file', await getFile(blobOrFilename))
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async getFileInfo(
    hash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<IFileInfo> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/refile/files/${hash}`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IFileInfo
  }

  /**
   * @throws {AbortError} 
   */
  async getFileLocation(
    hash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string | undefined> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/refile/files/${hash}/location`)
    )

    try {
      return await fetch(req)
        .then(ok)
        .then(toText)
    } catch (e) {
      if (e instanceof NotFound) return undefined
      throw e
    }
  }

  /**
   * @throws {AbortError}
   */
  async setReference(
    namespace: string
  , id: string
  , fileHash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/refile/namespaces/${namespace}/items/${id}/files/${fileHash}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeReference(
    namespace: string
  , id: string
  , fileHash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/refile/namespaces/${namespace}/items/${id}/files/${fileHash}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeReferencesByItem(
    namespace: string
  , id: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/refile/namespaces/${namespace}/items/${id}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeReferencesByNamespace(
    namespace: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/refile/namespaces/${namespace}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async getAllNamespaces(
    options: IRefileClientRequestOptionsWithoutToken = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/refile/namespaces')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async getAllItemIds(
    namespace: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/refile/namespaces/${namespace}/items`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async getFileHashesByItem(
    namespace: string
  , id: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/refile/namespaces/${namespace}/items/${id}/files`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async getItemIdsByFile(
    fileHash: string
  , namespace: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/refile/files/${fileHash}/namespaces/${namespace}/items`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async collectGarbage(options: IRefileClientRequestOptionsWithoutToken = {}): Promise<void> {
    const req = post(
      ...this.getCommonTransformers(options)
    , appendPathname('/refile/gc')
    )

    await fetch(req).then(ok)
  }
}
