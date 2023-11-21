import { isntString, assert } from '@blackglory/prelude'

export async function getFile(blob: Blob | string): Promise<Blob> {
  assert(isntString(blob), 'The function only accepts Blob on browser side')

  return blob
}
