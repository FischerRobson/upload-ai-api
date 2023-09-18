import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function createPromptRoute(app: FastifyInstance) {
  app.post('/prompt', async (req, res) => {
    const bodySchema = z.object({
      title: z.string(),
      template: z.string(),
    })

    const { title, template } = bodySchema.parse(req.body)

    const prompt = await prisma.prompt.create({
      data: { title, template },
    })

    return prompt
  })
}
