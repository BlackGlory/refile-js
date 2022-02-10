import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badToken } from '@test/utils'

export const server = setupServer(
  rest.put('/refile/files/:hash', (req, res, ctx) => {
    expect(req.params.hash).toBe('6dd7e8e932ea9d58555d7fee44a9b01a9bd7448e986636b728ee3711b01f37ce')

    return res(
      ctx.status(200)
    )
  })
, rest.get('/refile/files/:hash', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json({
        hash: 'hash'
      , location: null
      , references: 0
      })
    )
  })

, rest.put('/refile/namespaces/:namespace/items/:id/files/:hash', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.delete('/refile/namespaces/:namespace/items/:id/files/:hash', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.delete('/refile/namespaces/:namespace/items/:id', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.delete('/refile/namespaces/:namespace', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.get('/refile/namespaces', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json(['namespace'])
    )
  })

, rest.get('/refile/namespaces/:namespace/items', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.get('/refile/namespaces/:namespace/items/:id/files', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['hash'])
    )
  })

, rest.get('/refile/files/:hash/namespaces/:namespace/items', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.post('/refile/gc', (req, res, ctx) => {
    return res(
      ctx.status(204)
    )
  })
)
