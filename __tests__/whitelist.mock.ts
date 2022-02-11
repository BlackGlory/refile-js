import fastify from 'fastify'
import { badAuth } from '@test/utils'

export function buildServer() {
  const server = fastify()

  server.get('/admin/whitelist', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(200).send(['namespace'])
  })

  server.put('/admin/whitelist/:namespace', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.delete('/admin/whitelist/:namespace', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  return server
}
