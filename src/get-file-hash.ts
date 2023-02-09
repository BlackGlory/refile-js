import { getHashInfo } from '@utils/get-hash-info.js'

export async function getFileHash(blobOrFilename: Blob | string): Promise<string> {
  const hashInfo = await getHashInfo(blobOrFilename)
  return hashInfo.hash
}
