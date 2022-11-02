import * as fs from 'fs'
import { splitHash, IProgressiveHash } from 'split-hash/nodejs'
import * as crypto from 'crypto'
import { toArrayAsync } from 'iterable-operator'
import { IHashInfo } from '@src/utils.js'
import { isString } from '@blackglory/types'
import { HASH_BLOCK_SIZE } from './constants.js'
import { assert } from '@blackglory/errors'
import { sha256 } from 'extra-compatible'

export async function getHashInfo(filename: string | Blob): Promise<IHashInfo> {
  assert(isString(filename), 'The function only accepts string on Node.js side')

  const stream = fs.createReadStream(filename)
  const hashList = await getHashList(stream)
  const hash = await sha256(hashList.join(''))
  return { hash, hashList }
}

async function getHashList(stream: NodeJS.ReadableStream): Promise<string[]> {
  const hashList = await toArrayAsync(splitHash(stream, HASH_BLOCK_SIZE, createHash))
  return hashList
}

function createHash(): IProgressiveHash<string> {
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
