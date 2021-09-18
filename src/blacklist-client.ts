import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname } from 'extra-request/transformers'
import { ok, toJSON } from 'extra-response'
import { IRefileManagerRequestOptions, RefileManagerBase } from './utils'

export class BlacklistClient extends RefileManagerBase {
  async getNamespaces(options: IRefileManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/blacklist')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async add(namespace: string, options: IRefileManagerRequestOptions = {}): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/blacklist/${namespace}`)
    )

    await fetch(req).then(ok)
  }

  async remove(namespace: string, options: IRefileManagerRequestOptions = {}): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/blacklist/${namespace}`)
    )

    await fetch(req).then(ok)
  }
}
