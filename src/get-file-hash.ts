import { getHashInfo } from '@utils/get-hash-info.js'

export async function getFileHash(file: Blob | string): Promise<string> {
  const hashInfo = await getHashInfo(file)
  return hashInfo.hash
}
