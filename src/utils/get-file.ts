import { Blob } from 'extra-fetch'
/* @ts-ignore */
import blobFrom = require('fetch-blob/from')
import { isString } from '@blackglory/types'

export function getFile(file: Blob | string): Blob {
  if (isString(file)) {
    return new Blob([blobFrom(file)])
  } else {
    return file
  }
}
