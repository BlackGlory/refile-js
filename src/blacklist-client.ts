import { fetch } from 'extra-fetch'
import { password } from '@utils/password'
import { get, put, del } from 'extra-request'
import { url, pathname, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { RefileManagerOptions } from './refile-manager'
import { RefileManagerRequestOptions } from './types'

export class BlacklistClient {
  constructor(private options: RefileManagerOptions) {}

  async getIds(options: RefileManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/blacklist')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async add(id: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/blacklist/${id}`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async remove(id: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/blacklist/${id}`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
