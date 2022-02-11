import { isntString } from '@blackglory/types'
import { assert } from '@blackglory/errors'

export async function getFile(blob: Blob | string): Promise<Blob> {
  assert(isntString(blob), 'The function only accepts Blob on browser side')

  return blob
}
