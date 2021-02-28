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
})
```

```ts
interface IRefileClientRequestOptions {
  signal?: AbortSignal
  token?: string
}

interface IRefileClientRequestOptionsWithoutToken {
  signal?: AbortSignal
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
RefileClient#setReference(namespace: string, itemId: string, fileHash: string, options?: IRefileClientRequestOptions): Promise<void>
```

#### removeReference

```ts
RefileClient#removeReference(namespace: string, itemId: string, fileHash: string, options?: IRefileClientRequestOptions): Promise<void>
```

#### removeReferencesByItem

```ts
RefileClient#removeReferencesByItem(namespace: string, itemId: string, options?: IRefileClientRequestOptions): Promise<void>
```

#### getAllNamespaces

```ts
RefileClient#getAllNamespaces(options?: IRefileClientRequestOptionsWithoutToken): Promise<string[]>
```

#### getAllItemIds

```ts
RefileClient#getAllItemIds(namespace: string, options?: IRefileClientRequestOptions): Promise<string[]>
```

#### getFileHashesByItem

```ts
RefileClient#getFileHashesByItem(namespace: string, itemId: string, options?: IRefileClientRequestOptions): Promise<string[]>
```

#### getItemIdsByFile

```ts
RefileClient#getItemIdsByFile(fileHash: string, namespace: string, options?: IRefileClientRequestOptions): Promise<string[]>
```

### RefileManager

```ts
new RefileManager({
  server: string
, adminPassword: string
})
```

```ts
interface IRefileManagerRequestOptions {
  signal?: AbortSignal
}
```

#### Blacklist

##### getIds

```ts
RefileManager#Blacklist.getIds(options?: IRefileManagerRequestOptions): Promise<string[]>
```

##### add

```ts
RefileManager#Blacklist.add(id: string, options?: IRefileManagerRequestOptions): Promise<void>
```

##### remove

```ts
RefileManager#Blacklist.remove(id: string, options?: IRefileManagerRequestOptions): Promise<void>
```

#### Whitelist

##### getIds

```ts
RefileManager#Whitelist.getIds(options?: IRefileManagerRequestOptions): Promise<string[]>
```

##### add

```ts
RefileManager#Whitelist.add(id: string, options?: IRefileManagerRequestOptions): Promise<void>
```

##### remove

```ts
RefileManager#Whitelist.remove(id: string, options?: IRefileManagerRequestOptions): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
RefileManager#TokenPolicy.getIds(options?: IRefileManagerRequestOptions): Promise<string[]>
```

##### get

```ts
RefileManager#TokenPolicy.get(id: string, options?: IRefileManagerRequestOptions): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired

```ts
RefileManager#TokenPolicy.setWriteTokenRequired(id: string, val: boolean, options?: IRefileManagerRequestOptions): Promise<void>
```

##### removeWriteTokenRequired

```ts
RefileManager#TokenPolicy.removeWriteTokenRequired(id: string, options?: IRefileManagerRequestOptions): Promise<void>
```

##### setReadTokenRequired


```ts
RefileManager#TokenPolicy.setReadTokenRequired(id: string, val: boolean, options?: IRefileManagerRequestOptions): Promise<void>
```

##### removeReadTokenRequired

```ts
RefileManager#TokenPolicy.removeReadTokenRequired(id: string, options?: IRefileManagerRequestOptions): Promise<void>
```

##### setDeleteTokenRequired

```ts
RefileManager#TokenPolicy.setDeleteTokenRequired(id: string, val: boolean, options?: IRefileManagerRequestOptions): Promise<void>
```

##### removeDeleteTokenRequired

```ts
RefileManager#TokenPolicy.removeDeleteTokenRequired(id: string, options?: IRefileManagerRequestOptions): Promise<void>
```

#### Token

##### getIds

```ts
RefileManager#Token.getIds(options?: IRefileManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
RefileManager#Token.getTokens(id: string, options?: IRefileManagerRequestOptions): Promise<Array<{
  token: string
  write: boolean
  read: boolean
  delete: boolean
}>>
```

##### addWriteToken

```ts
RefileManager#Token.addWriteToken(id: string, token: string, options?: IRefileManagerRequestOptions): Promise<void>
```

##### removeWriteToken

```ts
RefileManager#Token.removeWriteToken(id: string, token: string, options?: IRefileManagerRequestOptions): Promise<void>
```

##### addReadToken

```ts
RefileManager#Token.addReadToken(id: string, token: string, options?: IRefileManagerRequestOptions): Promise<void>
```

##### removeReadToken

```ts
RefileManager#Token.removeReadToken(id: string, token: string, options?: IRefileManagerRequestOptions): Promise<void>
```

##### addDeleteToken

```ts
RefileManager#Token.addDeleteToken(id: string, token: string, options?: IRefileManagerRequestOptions): Promise<void>
```

##### removeDeleteToken

```ts
RefileManager#Token.removeDeleteToken(id: string, token: string, options?: IRefileManagerRequestOptions): Promise<void>
```
