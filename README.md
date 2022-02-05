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
getFileHash(file: Blob | string): Promise<string>
```

### RefileClient

```ts
new RefileClient({
  server: string
, token?: string
, basicAuth?: {
    username: string
  , password: string
  }
, keepalive?: boolean
, timeout?: number
})
```

```ts
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
```

#### uploadFile

```ts
RefileClient#uploadFile(file: Blob | string, options?: IRefileClientRequestOptionsWithoutToken): Promise<void>
```

#### getFileInfo

```ts
RefileClient#getFileInfo(hash: string, options?: IRefileClientRequestOptions): Promise<{
  hash: string
  location: string | null
  references: number
}>
```

#### setReference

```ts
RefileClient#setReference(
  namespace: string
, id: string
, fileHash: string
, options?: IRefileClientRequestOptions
): Promise<void>
```

#### removeReference

```ts
RefileClient#removeReference(
  namespace: string
, id: string
, fileHash: string
, options?: IRefileClientRequestOptions
): Promise<void>
```

#### removeReferencesByItem

```ts
RefileClient#removeReferencesByItem(
  namespace: string
, id: string
, options?: IRefileClientRequestOptions
): Promise<void>
```

#### getAllNamespaces

```ts
RefileClient#getAllNamespaces(
  options?: IRefileClientRequestOptionsWithoutToken
): Promise<string[]>
```

#### getAllItemIds

```ts
RefileClient#getAllItemIds(
  namespace: string
, options?: IRefileClientRequestOptions
): Promise<string[]>
```

#### getFileHashesByItem

```ts
RefileClient#getFileHashesByItem(
  namespace: string
, id: string
, options?: IRefileClientRequestOptions
): Promise<string[]>
```

#### getItemIdsByFile

```ts
RefileClient#getItemIdsByFile(
  fileHash: string
, namespace: string
, options?: IRefileClientRequestOptions
): Promise<string[]>
```

#### collectGarbage

```ts
RefileClient#collectGarbage(options?: IRefileClientRequestOptionsWithoutToken): Promise<void>
```

### RefileManager

```ts
new RefileManager({
  server: string
, adminPassword: string
, keepalive?: boolean
, timeout?: number
})
```

```ts
interface IRefileManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}
```

#### Blacklist

##### getNamespaces

```ts
RefileManager#Blacklist.getNamespaces(
  options?: IRefileManagerRequestOptions
): Promise<string[]>
```

##### add

```ts
RefileManager#Blacklist.add(
  namespace: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### remove

```ts
RefileManager#Blacklist.remove(
  namespace: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

#### Whitelist

##### getNamespaces

```ts
RefileManager#Whitelist.getNamespaces(
  options?: IRefileManagerRequestOptions
): Promise<string[]>
```

##### add

```ts
RefileManager#Whitelist.add(
  namespace: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### remove

```ts
RefileManager#Whitelist.remove(
  namespace: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

#### TokenPolicy

##### getNamespaces

```ts
RefileManager#TokenPolicy.getNamespaces(
  options?: IRefileManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
RefileManager#TokenPolicy.get(
  namespace: string
, options?: IRefileManagerRequestOptions
): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired

```ts
RefileManager#TokenPolicy.setWriteTokenRequired(
  namespace: string
, val: boolean
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### removeWriteTokenRequired

```ts
RefileManager#TokenPolicy.removeWriteTokenRequired(
  namespace: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### setReadTokenRequired


```ts
RefileManager#TokenPolicy.setReadTokenRequired(
  namespace: string
, val: boolean
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### removeReadTokenRequired

```ts
RefileManager#TokenPolicy.removeReadTokenRequired(
  namespace: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### setDeleteTokenRequired

```ts
RefileManager#TokenPolicy.setDeleteTokenRequired(
  namespace: string
, val: boolean
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### removeDeleteTokenRequired

```ts
RefileManager#TokenPolicy.removeDeleteTokenRequired(
  namespace: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

#### Token

##### getNamespaces

```ts
RefileManager#Token.getNamespaces(options?: IRefileManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
RefileManager#Token.getTokens(
  namespace: string
, options?: IRefileManagerRequestOptions
): Promise<Array<{
  token: string
  write: boolean
  read: boolean
  delete: boolean
}>>
```

##### addWriteToken

```ts
RefileManager#Token.addWriteToken(
  namespace: string
, token: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### removeWriteToken

```ts
RefileManager#Token.removeWriteToken(
  namespace: string
, token: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### addReadToken

```ts
RefileManager#Token.addReadToken(
  namespace: string
, token: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### removeReadToken

```ts
RefileManager#Token.removeReadToken(
  namespace: string
, token: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### addDeleteToken

```ts
RefileManager#Token.addDeleteToken(
  namespace: string
, token: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```

##### removeDeleteToken

```ts
RefileManager#Token.removeDeleteToken(
  namespace: string
, token: string
, options?: IRefileManagerRequestOptions
): Promise<void>
```
