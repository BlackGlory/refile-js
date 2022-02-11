import fastify from 'fastify'
import multipart from 'fastify-multipart'
import { badToken } from '@test/utils'

export function buildServer() {
  const server = fastify()

  server.register(multipart)

  server.put<{
    Params: {
      hash: string
    }
  }>('/refile/files/:hash', async (req, reply) => {
    expect(req.params.hash).toBe('6dd7e8e932ea9d58555d7fee44a9b01a9bd7448e986636b728ee3711b01f37ce')

    const file = await req.file()
    const buffer = await file.toBuffer()
    const content = buffer.toString()
    expect(content).toBe('hello world\n')

    reply.status(200).send()
  })

  server.get('/refile/files/:hash', (req, reply) => {
    reply.status(200).send({
      hash: 'hash'
    , location: null
    , references: 0
    })
  })

  server.put<{
    Params: {
      namespace: string
      id: string
      hash: string
    }
  }>('/refile/namespaces/:namespace/items/:id/files/:hash', async (req, reply) => {
    if (badToken(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.delete<{
    Params: {
      namespace: string
      id: string
      hash: string
    }
  }>('/refile/namespaces/:namespace/items/:id/files/:hash', async (req, reply) => {
    if (badToken(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.delete<{
    Params: {
      namespace: string
      id: string
    }
  }>('/refile/namespaces/:namespace/items/:id', async (req, reply) => {
    if (badToken(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.delete<{
    Params: {
      namespace: string
    }
  }>('/refile/namespaces/:namespace', async (req, reply) => {
    if (badToken(req)) return reply.status(401).send()

    reply.status(204).send()
  })

  server.get('/refile/namespaces', async (req, reply) => {
    reply.status(200).send(['namespace'])
  })

  server.get('/refile/namespaces/:namespace/items', async (req, reply) => {
    if (badToken(req)) return reply.status(401).send()

    reply.status(200).send(['id'])
  })

  server.get('/refile/namespaces/:namespace/items/:id/files', async (req, reply) => {
    if (badToken(req)) return reply.status(401).send()

    reply.status(200).send(['hash'])
  })

  server.get('/refile/files/:hash/namespaces/:namespace/items', async (req, reply) => {
    if (badToken(req)) return reply.status(401).send()

    reply.status(200).send(['id'])
  })

  server.post('/refile/gc', async (req, reply) => {
    reply.status(204).send()
  })

  return server
}
