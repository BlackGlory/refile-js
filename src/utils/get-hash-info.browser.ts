import { HashInfo } from '@src/types'
import { toArrayAsync, map, toArray } from 'iterable-operator'
import { isString } from '@blackglory/types'
import { HASH_BLOCK_SIZE } from './constants'

type ProgressiveHashFactory<T> = () => ProgressiveHash<T>

interface ProgressiveHash<T> {
  update(buffer: Uint8Array): void
  digest(): Promise<T>
}

export async function getHashInfo(blob: Blob | string): Promise<HashInfo> {
  if (isString(blob)) throw new Error('This function only accepts Blob on browser side')

  const stream = blob.stream()
  const hashList = await getHashList(stream)
  const hash = await mergeHash(hashList)
  return { hash, hashList }
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

async function getHashList(stream: ReadableStream) {
  const hashList = await toArrayAsync(splitHash(stream, HASH_BLOCK_SIZE, createHash))
  return hashList
}

function createHash(): ProgressiveHash<string> {
  let pos = 0
  const data = new Uint8Array(HASH_BLOCK_SIZE)

  return {
    update(buffer: Uint8Array): void {
      buffer.forEach((x, i) => data[pos + i] = x)
      pos += buffer.length
    }
  , async digest(): Promise<string> {
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      return bufferToHex(hashBuffer)
    }
  }
}

async function* getIterator(stream: ReadableStream): AsyncIterable<Uint8Array> {
  const reader = stream.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      yield value
    }
  } finally {
    reader.cancel()
    reader.releaseLock()
  }
}

async function* splitHash<T>(stream: ReadableStream, blockSize: number, createHash: ProgressiveHashFactory<T>): AsyncIterable<T> {
  let hash = createHash()
  let accu = 0
  for await (const chunk of getIterator(stream)) {
    if (accu + chunk.length < blockSize) {
      hash.update(chunk)
      accu += chunk.length
    } else {
      let offset = 0
      while (true) {
        const needed = blockSize - accu
        const slice = chunk.slice(offset, offset + needed)
        if (slice.length === needed) {
          hash.update(slice)
          const digest = await hash.digest()
          yield digest
          // prepare for the next round
          hash = createHash()
          accu = 0
          offset += slice.length
        } else {
          // if the length does not match, the remaining data is not long enough, update the remaining data and exit the loop.
          hash.update(slice)
          accu += slice.length
          break
        }
      }
    }
  }
  // digest remaining data if it exists
  if (accu > 0) yield await hash.digest()
}
