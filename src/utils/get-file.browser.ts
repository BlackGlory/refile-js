import { isString } from '@blackglory/types'

export async function getFile(fileOrFilename: Blob | string): Promise<Blob> {
  if (isString(fileOrFilename)) {
    throw new Error('This function only accepts Blob on browser side')
  }

  return fileOrFilename
}
