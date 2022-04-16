import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IRefileManagerRequestOptions, RefileManagerBase } from './utils.js'

export class WhitelistClient extends RefileManagerBase {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IRefileManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/whitelist')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async add(namespace: string, options: IRefileManagerRequestOptions = {}): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/whitelist/${namespace}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async remove(namespace: string, options: IRefileManagerRequestOptions = {}): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/whitelist/${namespace}`)
    )

    await fetch(req).then(ok)
  }
}
