import { FastifyRequest } from 'fastify'
import { FastifyInstance } from 'fastify'

export const ADMIN_PASSWORD = 'password'
export const TOKEN = 'token'

let server: FastifyInstance
let address: string

export async function startService(buildServer: () => FastifyInstance) {
  server = buildServer()
  address = await server.listen(0)
}

export async function stopService() {
  await server.close()
}

export function getAddress(): string {
  return address
}

export function badAuth(req: FastifyRequest): boolean {
  return getPassword(req) !== ADMIN_PASSWORD

  function getPassword(req: FastifyRequest) {
    const authorization = req.headers['authorization']
    if (!authorization) return null
    const result = authorization.match(/^Bearer (\S+)$/)
    if (!result) return null
    return result[1]
  }
}

export function badJson(req: FastifyRequest): boolean {
  const contentType = req.headers['content-type']
  if (contentType !== 'application/json') return true
  if (!req.body) return true
  return false
}

export function badToken(req: FastifyRequest<any>): boolean {
  const token = req.query.token
  if (!token) return true
  if (token !== TOKEN) return true
  return false
}
