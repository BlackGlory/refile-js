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
function getFileHash(file: Blob | string): Promise<string>
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
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

interface IRefileClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

interface IRefileClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

class RefileClient {
  constructor(options: IRefileClientOptions)

  uploadFile(
    blobOrFilename: Blob | string
  , options: IRefileClientRequestOptionsWithoutToken = {}
  ): Promise<void>

  getFileInfo(
    hash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<IFileInfo>

  getFileLocation(
    hash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string | undefined>

  setReference(
    namespace: string
  , id: string
  , fileHash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void>

  removeReference(
    namespace: string
  , id: string
  , fileHash: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void>

  removeReferencesByItem(
    namespace: string
  , id: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void>

  removeReferencesByNamespace(
    namespace: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<void>

  getAllNamespaces(
    options: IRefileClientRequestOptionsWithoutToken = {}
  ): Promise<string[]>

  getAllItemIds(
    namespace: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string[]>

  getFileHashesByItem(
    namespace: string
  , id: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string[]>

  getItemIdsByFile(
    fileHash: string
  , namespace: string
  , options: IRefileClientRequestOptions = {}
  ): Promise<string[]>

  collectGarbage(options: IRefileClientRequestOptionsWithoutToken = {}): Promise<void>
}
```

### RefileManager
```ts
interface IRefileManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

class RefileManager {
  constructor(options: IRefileManagerOptions)

  Blacklist: BlacklistClient
  Whitelist: WhitelistClient
  TokenPolicy: TokenPolicyClient
  Token: TokenClient
}
```

#### BlacklistClient
```ts
class BlacklistClient {
  getNamespaces(options: IRefileManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IRefileManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IRefileManagerRequestOptions = {}): Promise<void>
}
```

#### WhitelistClient
```ts
class WhitelistClient {
  getNamespaces(options: IRefileManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IRefileManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IRefileManagerRequestOptions = {}): Promise<void>
}
```

#### TokenPolicyClient
```ts
interface ITokenPolicy {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}

class TokenPolicyClient {
  getNamespaces(options: IRefileManagerRequestOptions = {}): Promise<string[]>
  get(
    namespace: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<ITokenPolicy>
  setWriteTokenRequired(
    namespace: string
  , val: boolean
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
  removeWriteTokenRequired(
    namespace: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
  setReadTokenRequired(
    namespace: string
  , val: boolean
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
  removeReadTokenRequired(
    namespace: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
  setDeleteTokenRequired(
    namespace: string
  , val: boolean
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
  removeDeleteTokenRequired(
    namespace: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
}
```

#### TokenClient
```ts
interface ITokenInfo {
  token: string
  write: boolean
  read: boolean
  delete: boolean
}

class TokenClient {
  getNamespaces(options: IRefileManagerRequestOptions = {}): Promise<string[]>
  getTokens(
    namespace: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<ITokenInfo[]>
  addWriteToken(
    namespace: string
  , token: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
  removeWriteToken(
    namespace: string
  , token: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
  addReadToken(
    namespace: string
  , token: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
  removeReadToken(
    namespace: string
  , token: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
  addDeleteToken(
    namespace: string
  , token: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
  removeDeleteToken(
    namespace: string
  , token: string
  , options: IRefileManagerRequestOptions = {}
  ): Promise<void>
}
```
