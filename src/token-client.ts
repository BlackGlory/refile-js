import { fetch } from 'extra-fetch'
import { password } from '@utils/password'
import { get, put, del } from 'extra-request'
import { url, pathname, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { IRefileManagerOptions } from './refile-manager'
import { RefileManagerRequestOptions } from './types'

interface TokenInfo {
  token: string
  write: boolean
  read: boolean
  delete: boolean
}

export class TokenClient {
  constructor(private options: IRefileManagerOptions) {}

  async getIds(options: RefileManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/refile-with-tokens')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getTokens(id: string, options: RefileManagerRequestOptions = {}): Promise<TokenInfo[]> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/refile/${id}/tokens`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as TokenInfo[]
  }

  async addWriteToken(id: string, token: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/refile/${id}/tokens/${token}/write`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeWriteToken(id: string, token: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/refile/${id}/tokens/${token}/write`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async addReadToken(id: string, token: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/refile/${id}/tokens/${token}/read`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeReadToken(id: string, token: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/refile/${id}/tokens/${token}/read`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async addDeleteToken(id: string, token: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/refile/${id}/tokens/${token}/delete`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteToken(id: string, token: string, options: RefileManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/refile/${id}/tokens/${token}/delete`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
