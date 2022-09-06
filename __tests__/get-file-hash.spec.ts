import { getFileHash } from '@src/get-file-hash.js'
import { fileURLToPath } from 'url'

describe('getFileHash(file: Blob | string): Promise<string>', () => {
  it('return Promise<string>', async () => {
    const filename = fileURLToPath(new URL('fixtures/file.txt', import.meta.url))

    const result = await getFileHash(filename)

    expect(result).toBe('6dd7e8e932ea9d58555d7fee44a9b01a9bd7448e986636b728ee3711b01f37ce')
  })
})
