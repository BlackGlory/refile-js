import { fastify } from 'fastify'
import { badAuth } from '@test/utils.js'

export function buildServer() {
  const server = fastify({
    forceCloseConnections: true
  })

  server.get('/admin/refile-with-tokens', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(200).send(['namespace'])
  })

  server.get('/admin/refile/:namespace/tokens', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(200).send([
      {
        token: 'token'
      , write: true
      , read: false
      , delete: false
      }
    ])
  })

  server.put('/admin/refile/:namespace/tokens/:token/write', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.delete('/admin/refile/:namespace/tokens/:token/write', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.put('/admin/refile/:namespace/tokens/:token/read', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.delete('/admin/refile/:namespace/tokens/:token/read', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.put('/admin/refile/:namespace/tokens/:token/delete', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.delete('/admin/refile/:namespace/tokens/:token/delete', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  return server
}
