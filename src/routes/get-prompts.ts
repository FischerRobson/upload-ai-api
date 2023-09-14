import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function getPromptsRoute(app: FastifyInstance) {
  app.get('/prompts', async (req, res) => {
    const prompts = await prisma.prompt.findMany()

    return prompts
  })
}
