import { IHTTPOptionsTransformer } from 'extra-request'
import { url, signal, keepalive, bearerAuth } from 'extra-request/transformers'
import { timeoutSignal, raceAbortSignals } from 'extra-promise'
import type { IRefileManagerOptions } from './refile-manager'

export interface IRefileManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export interface IHashInfo {
  hash: string
  hashList: string[]
}

export class RefileManagerBase {
  constructor(private options: IRefileManagerOptions) {}

  protected getCommonTransformers(
    options: IRefileManagerRequestOptions
  ): IHTTPOptionsTransformer[] {
    return [
      url(this.options.server)
    , bearerAuth(this.options.adminPassword)
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , keepalive(options.keepalive ?? this.options.keepalive)
    ]
  }
}
