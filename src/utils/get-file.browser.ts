import { isString } from '@blackglory/types'

export function getFile(file: Blob | string): Blob {
  if (isString(file)) throw new Error('This function only accepts Blob on browser side')
  return file
}
