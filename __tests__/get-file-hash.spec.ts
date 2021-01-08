import { getFileHash } from '@src/get-file-hash'
import * as path from 'path'
import '@blackglory/jest-matchers'

describe('getFileHash(file: Blob | string): Promise<string>', () => {
  it('return Promise<string>', async () => {
    const filename = path.join(__dirname, './fixtures/file.txt')

    const result = getFileHash(filename)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('6dd7e8e932ea9d58555d7fee44a9b01a9bd7448e986636b728ee3711b01f37ce')
  })
})
