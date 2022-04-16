import { BlacklistClient } from './blacklist-client.js'
import { WhitelistClient } from './whitelist-client.js'
import { TokenPolicyClient } from './token-policy-client.js'
import { TokenClient } from './token-client.js'

export interface IRefileManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

export class RefileManager {
  constructor(private options: IRefileManagerOptions) {}

  Blacklist = new BlacklistClient(this.options)
  Whitelist = new WhitelistClient(this.options)
  TokenPolicy = new TokenPolicyClient(this.options)
  Token = new TokenClient(this.options)
}
