import { IHTTPOptionsTransformer } from 'extra-request'
import { url, signal, keepalive, bearerAuth, header } from 'extra-request/transformers/index.js'
import { timeoutSignal, raceAbortSignals } from 'extra-abort'
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
    , header('Accept-Version', '0.5.3')
    ]
  }
}
