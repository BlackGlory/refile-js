import * as fs from 'fs'
import { isString } from '@blackglory/types'

export function getFile(file: Blob | string): NodeJS.ReadableStream {
  if (!isString(file)) throw new Error('This function only accepts string on Node.js side')
  return fs.createReadStream(file)
}
