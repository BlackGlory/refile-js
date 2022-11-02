import { IHashInfo } from '@src/utils.js'
import { toArrayAsync } from 'iterable-operator'
import { isntString } from '@blackglory/types'
import { HASH_BLOCK_SIZE } from './constants.js'
import { splitHash, IProgressiveHash } from 'split-hash/whatwg'
import { assert } from '@blackglory/errors'
import { sha256 } from 'extra-compatible'

export async function getHashInfo(blob: Blob | string): Promise<IHashInfo> {
  assert(isntString(blob), 'The function only accepts Blob on browser side')

  // TypeScript无法区分WHATWG的Blob和Node.js的Blob, 只好在此手动设置返回值类型.
  const stream = blob.stream() as unknown as ReadableStream
  const hashList = await getHashList(stream)
  const hash = await sha256(hashList.join(''))
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
      return await sha256(data.slice(0, pos))
    }
  }
}
