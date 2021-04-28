import { fetch } from 'extra-fetch'
import { put, get, del } from 'extra-request'
import { url, pathname, searchParams, signal, formDataField, keepalive } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import { getHashInfo } from '@utils/get-hash-info'
import { getFile } from '@utils/get-file'

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
}

export interface IRefileClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
}

export interface IRefileClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
}

export class RefileClient {
  constructor(private options: IRefileClientOptions) {}

  async uploadFile(
    file: Blob | string
  , options: IRefileClientRequestOptionsWithoutToken = {}
  ): Promise<void> {
    const { hash, hashList } = await getHashInfo(file)

    const req = put(
      url(this.options.server)
    , pathname(`/refile/files/${hash}`)
    , formDataField('hash', hashList)
    , formDataField('file', getFile(file))
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async getFileInfo(
    hash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<IFileInfo> {
    const req = get(
      url(this.options.server)
    , pathname(`/refile/files/${hash}`)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
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
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${fileHash}`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async removeReference(
    namespace: string
  , id: string
  , fileHash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/refile/namespaces/${namespace}/items/${id}/files/${fileHash}`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async removeReferencesByItem(
    namespace: string
  , id: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/refile/namespaces/${namespace}/items/${id}`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async getAllNamespaces(options: IRefileClientRequestOptionsWithoutToken = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/refile/namespaces')
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getAllItemIds(
    namespace: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string[]> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/refile/namespaces/${namespace}/items`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
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
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/refile/namespaces/${namespace}/items/${id}/files`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
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
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/refile/files/${fileHash}/namespaces/${namespace}/items`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }
}
