import { fetch } from 'extra-fetch'
import { post, put, get, del, IHTTPOptionsTransformer } from 'extra-request'
import { url, pathname, searchParams, signal, formDataField, keepalive }
  from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { getHashInfo } from '@utils/get-hash-info'
import { getFile } from '@utils/get-file'
import { raceAbortSignals, timeoutSignal } from 'extra-promise'
import { Falsy } from 'justypes'

export { HTTPClientError } from '@blackglory/http-status'

interface IFileInfo {
  hash: string
  location: string | null
  references: number
}

export interface IRefileClientOptions {
  server: string
  token?: string
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
  ): Array<IHTTPOptionsTransformer | Falsy> {
    const token = options.token ?? this.options.token

    return [
      url(this.options.server)
    , token && searchParams({ token })
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , keepalive(options.keepalive ?? this.options.keepalive)
    ]
  }

  async uploadFile(
    file: Blob | string
  , options: IRefileClientRequestOptionsWithoutToken = {}
  ): Promise<void> {
    const { hash, hashList } = await getHashInfo(file)

    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/refile/files/${hash}`)
    , formDataField('hash', hashList)
    , formDataField('file', getFile(file))
    )

    await fetch(req).then(ok)
  }

  async getFileInfo(
    hash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<IFileInfo> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/refile/files/${hash}`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IFileInfo
  }

  async setReference(
    namespace: string
  , id: string
  , fileHash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${fileHash}`)
    )

    await fetch(req).then(ok)
  }

  async removeReference(
    namespace: string
  , id: string
  , fileHash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${fileHash}`)
    )

    await fetch(req).then(ok)
  }

  async removeReferencesByItem(
    namespace: string
  , id: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/refile/namespaces/${namespace}/items/${id}`)
    )

    await fetch(req).then(ok)
  }

  async getAllNamespaces(options: IRefileClientRequestOptionsWithoutToken = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/refile/namespaces')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getAllItemIds(
    namespace: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/refile/namespaces/${namespace}/items`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getFileHashesByItem(
    namespace: string
  , id: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/refile/namespaces/${namespace}/items/${id}/files`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getItemIdsByFile(
    fileHash: string
  , namespace: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/refile/files/${fileHash}/namespaces/${namespace}/items`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async collectGarbage(options: IRefileClientRequestOptionsWithoutToken = {}): Promise<void> {
    const req = post(
      ...this.getCommonTransformers(options)
    , pathname('/refile/gc')
    )

    await fetch(req).then(ok)
  }
}
