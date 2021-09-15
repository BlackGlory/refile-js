import { IHashInfo } from '@src/utils'
import { toArrayAsync, map, toArray } from 'iterable-operator'
import { isString } from '@blackglory/types'
import { HASH_BLOCK_SIZE } from './constants'
import { splitHash, IProgressiveHash } from './split-hash.browser'

export async function getHashInfo(blob: Blob | string): Promise<IHashInfo> {
  if (isString(blob)) throw new Error('This function only accepts Blob on browser side')

  const stream = blob.stream()
  const hashList = await getHashList(stream)
  const hash = await mergeHash(hashList)
  return { hash, hashList }
}

async function getHashList(stream: ReadableStream) {
  const hashList = await toArrayAsync(splitHash(stream, HASH_BLOCK_SIZE, createHash))
  return hashList
}

function createHash(): IProgressiveHash<string> {
  let pos = 0
  const data = new Uint8Array(HASH_BLOCK_SIZE)

  return {
    update(buffer: Uint8Array): void {
      buffer.forEach((x, i) => data[pos + i] = x)
      pos += buffer.length
    }
  , async digest(): Promise<string> {
      const hashBuffer = await crypto.subtle.digest('SHA-256', data.slice(0, pos))
      return bufferToHex(hashBuffer)
    }
  }
}

async function mergeHash(hashList: string[]): Promise<string> {
  const message = hashList.join('')
  const encoder = new TextEncoder()
  const buffer = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  return bufferToHex(hashBuffer)
}

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  return toArray(map(bytes, byte => byte.toString(16).padStart(2, '0'))).join('')
}
