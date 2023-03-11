# refile-js
## Install
```sh
npm install --save @blackglory/refile-js
# or
yarn add @blackglory/refile-js
```

## API
### getFileHash
```ts
function getFileHash(blobOrFilename: Blob | string): Promise<string>
```

### RefileClient
```ts
interface IFileInfo {
  hash: string
  location: string | null
  references: number
}

interface IRefileClientOptions {
  server: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

interface IRefileClientRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

class RefileClient {
  constructor(options: IRefileClientOptions)

  uploadFile(
    blobOrFilename: Blob | string
  , options?: IRefileClientRequestOptions
  ): Promise<void>

  getFileInfo(hash: string, options?: IRefileClientRequestOptions): Promise<IFileInfo>

  getFileLocation(
    hash: string
  , options?: IRefileClientRequestOptions
  ): Promise<string | undefined>

  setReference(
    namespace: string
  , itemId: string
  , fileHash: string
  , options?: IRefileClientRequestOptions
  ): Promise<void>

  removeReference(
    namespace: string
  , itemId: string
  , fileHash: string
  , options?: IRefileClientRequestOptions
  ): Promise<void>

  removeReferencesByItemId(
    namespace: string
  , itemId: string
  , options?: IRefileClientRequestOptions
  ): Promise<void>

  removeReferencesByNamespace(
    namespace: string
  , options?: IRefileClientRequestOptions
  ): Promise<void>

  getAllNamespaces(options?: IRefileClientRequestOptions): Promise<string[]>

  getAllItemIds(namespace: string, options?: IRefileClientRequestOptions): Promise<string[]>

  getFileHashesByItemId(
    namespace: string
  , itemId: string
  , options?: IRefileClientRequestOptions
  ): Promise<string[]>

  getItemIdsByFileHash(
    fileHash: string
  , namespace: string
  , options?: IRefileClientRequestOptions
  ): Promise<string[]>

  collectGarbage(options?: IRefileClientRequestOptions): Promise<void>
}
```
