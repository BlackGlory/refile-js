import { Blob } from 'extra-fetch'
import { isString } from '@blackglory/prelude'
import { readFile } from 'fs/promises'

export async function getFile(fileOrFilename: Blob | string): Promise<Blob> {
  if (isString(fileOrFilename)) {
    const filename = fileOrFilename
    const buffer = await readFile(filename)
    return new Blob([buffer])
  } else {
    return fileOrFilename
  }
}
