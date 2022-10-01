import { fastify } from 'fastify'
import { badAuth } from '@test/utils.js'

export function buildServer() {
  const server = fastify()

  server.get('/admin/blacklist', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(200).send(['namespace'])
  })

  server.put('/admin/blacklist/:namespace', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.delete('/admin/blacklist/:namespace', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  return server
}
