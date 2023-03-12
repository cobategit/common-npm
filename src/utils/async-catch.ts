import { FastifyRequest, FastifyReply, FastifyError } from 'fastify'

export const asyncCatch = (fn: any) => {
  return (
    req: FastifyRequest,
    rep: FastifyReply,
    done: (error: FastifyError) => void
  ) => {
    Promise.resolve(fn(req, rep, done)).catch(done)
  }
}
