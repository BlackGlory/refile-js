import * as fs from 'fs'
import { splitHash, ProgressiveHash } from 'split-hash'
import * as crypto from 'crypto'
import { toArrayAsync } from 'iterable-operator'
import { IHashInfo } from '@src/utils'
import { isString } from '@blackglory/types'
import { HASH_BLOCK_SIZE } from './constants'

export async function getHashInfo(filename: string | Blob): Promise<IHashInfo> {
  if (!isString(filename)) {
    throw new Error('This function only accepts string on Node.js side')
  }

  const stream = fs.createReadStream(filename)
  const hashList = await getHashList(stream)
  const hash = mergeHash(hashList)
  return { hash, hashList }
}

async function getHashList(stream: NodeJS.ReadableStream): Promise<string[]> {
  const hashList = await toArrayAsync(splitHash(stream, HASH_BLOCK_SIZE, createHash))
  return hashList
}

function createHash(): ProgressiveHash<string> {
  const hash = crypto.createHash('sha256')
  return {
    update(buffer: Buffer): void {
      hash.update(buffer)
    }
  , digest(): string {
      return hash.digest('hex')
    }
  }
}

function mergeHash(hashList: string[]): string {
  const hash = crypto.createHash('sha256')
  hash.update(hashList.join(''))
  return hash.digest('hex')
}
