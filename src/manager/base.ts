import { IRequestOptionsTransformer } from 'extra-request'
import { url, signal, keepalive, bearerAuth, header } from 'extra-request/transformers'
import { timeoutSignal, raceAbortSignals } from 'extra-abort'
import { IRefileManagerOptions } from './index.js'
import { Falsy } from '@blackglory/prelude'

export interface IRefileManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export const expectedVersion = '0.5.7'

export class Base {
  constructor(private options: IRefileManagerOptions) {}

  protected getCommonTransformers(
    options: IRefileManagerRequestOptions
  ): Array<IRequestOptionsTransformer | Falsy> {
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
    , (options.keepalive ?? this.options.keepalive) && keepalive()
    , header('Accept-Version', expectedVersion)
    ]
  }
}
