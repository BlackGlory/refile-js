import { fastify } from 'fastify'
import { badAuth, badJson } from '@test/utils.js'

export function buildServer() {
  const server = fastify()

  server.get('/admin/refile-with-token-policies', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(200).send(['namespace'])
  })

  server.get('/admin/refile/:namespace/token-policies', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(200).send({
      writeTokenRequired: true
    , readTokenRequired: false
    , deleteTokenRequired: null
    })
  })

  server.put('/admin/refile/:namespace/token-policies/write-token-required', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()
    if (badJson(req)) return reply.status(400).send()

    reply.status(204).send()
  })

  server.delete('/admin/refile/:namespace/token-policies/write-token-required', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.put('/admin/refile/:namespace/token-policies/read-token-required', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()
    if (badJson(req)) return reply.status(400).send()

    reply.status(204).send()
  })

  server.delete('/admin/refile/:namespace/token-policies/read-token-required', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.put('/admin/refile/:namespace/token-policies/delete-token-required', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()
    if (badJson(req)) return reply.status(400).send()

    reply.status(204).send()
  })

  server.delete('/admin/refile/:namespace/token-policies/delete-token-required', async (req, reply) => {
    if (badAuth(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  return server
}
