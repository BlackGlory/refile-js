import { fetch } from '@utils/fetch'
import { put, get, del } from 'extra-request'
import { url, pathname, searchParams, signal, formDataField } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import { getHashInfo } from '@utils/get-hash-info'
import { getFile } from '@utils/get-file'

interface FileInfo {
  hash: string
  location: string | null
  references: number
}

export interface RefileClientOptions {
  server: string
  token?: string
}

export interface RefileClientRequestOptions {
  signal?: AbortSignal
  token?: string
}

export interface RefileClientRequestOptionsWithoutToken {
  signal?: AbortSignal
}

export class RefileClient {
  constructor(private options: RefileClientOptions) {}

  async uploadFile(file: Blob | string, options: RefileClientRequestOptionsWithoutToken = {}): Promise<void> {
    const { hash, hashList } = await getHashInfo(file)

    const req = put(
      url(this.options.server)
    , pathname(`/refile/files/${hash}`)
    , formDataField('hash', hashList)
    , formDataField('file', getFile(file))
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async getFileInfo(hash: string, options: RefileClientRequestOptions = {}): Promise<FileInfo> {
    const req = get(
      url(this.options.server)
    , pathname(`/refile/files/${hash}`)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as FileInfo
  }

  async setReference(
    namespace: string
  , itemId: string
  , fileHash: string
  , options: RefileClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/refile/namespaces/${namespace}/items/${itemId}/files/${fileHash}`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeReference(
    namespace: string
  , itemId: string
  , fileHash: string
  , options: RefileClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/refile/namespaces/${namespace}/items/${itemId}/files/${fileHash}`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeReferencesByItem(
    namespace: string
  , itemId: string
  , options: RefileClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/refile/namespaces/${namespace}/items/${itemId}`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async listNamespaces(options: RefileClientRequestOptionsWithoutToken = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/refile/namespaces')
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async listItems(
    namespace: string
  , options: RefileClientRequestOptions = {}
  ): Promise<string[]> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/refile/namespaces/${namespace}/items`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async listFilesByItem(
    namespace: string
  , itemId: string
  , options: RefileClientRequestOptions = {}
  ): Promise<string[]> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/refile/namespaces/${namespace}/items/${itemId}/files`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async listItemsByFile(
    fileHash: string
  , namespace: string
  , options: RefileClientRequestOptions = {}
  ): Promise<string[]> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/refile/files/${fileHash}/namespaces/${namespace}/items`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }
}
