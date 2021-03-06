export type IProgressiveHashFactory<T> = () => IProgressiveHash<T>

export interface IProgressiveHash<T> {
  update(buffer: Uint8Array): void
  digest(): Promise<T>
}

export async function* splitHash<T>(
  stream: ReadableStream
, blockSize: number
, createHash: IProgressiveHashFactory<T>
): AsyncIterable<T> {
  let hash = createHash()
  let accu = 0
  for await (const chunk of getIterator(stream)) {
    if (accu + chunk.length < blockSize) {
      hash.update(chunk)
      accu += chunk.length
    } else {
      let offset = 0
      while (true) {
        const needed = blockSize - accu
        const slice = chunk.slice(offset, offset + needed)
        if (slice.length === needed) {
          hash.update(slice)
          const digest = await hash.digest()
          yield digest
          // prepare for the next round
          hash = createHash()
          accu = 0
          offset += slice.length
        } else {
          // if the length does not match,
          // the remaining data is not long enough, update the remaining data and exit the loop.
          hash.update(slice)
          accu += slice.length
          break
        }
      }
    }
  }
  // digest remaining data if it exists
  if (accu > 0) yield await hash.digest()
}

async function* getIterator(stream: ReadableStream): AsyncIterable<Uint8Array> {
  const reader = stream.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      yield value
    }
  } finally {
    reader.cancel()
    reader.releaseLock()
  }
}
