import { fetch } from 'extra-fetch'
import { password } from '@utils/password'
import { get, put, del } from 'extra-request'
import { url, pathname, json, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { RefileManagerOptions } from './refile-manager'
import { RefileManagerRequestOptions } from './types'

interface TokenPolicy {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}

export class TokenPolicyClient {
  constructor(private options: RefileManagerOptions) {}

  async getIds(options: RefileManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/refile-with-token-policies')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(id: string, options: RefileManagerRequestOptions = {}): Promise<TokenPolicy> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/refile/${id}/token-policies`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as TokenPolicy
  }

  async setWriteTokenRequired(id: string, val: boolean, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/refile/${id}/token-policies/write-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeWriteTokenRequired(id: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/refile/${id}/token-policies/write-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setReadTokenRequired(id: string, val: boolean, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/refile/${id}/token-policies/read-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeReadTokenRequired(id: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/refile/${id}/token-policies/read-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setDeleteTokenRequired(id: string, val: boolean, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/refile/${id}/token-policies/delete-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteTokenRequired(id: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/refile/${id}/token-policies/delete-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
