import { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma'
import { openai } from '../lib/openai'
import { streamToResponse, OpenAIStream } from 'ai'

export async function createAICompletionRoute(app: FastifyInstance) {
  app.post('/ai/completion', async (req, res) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    })

    const { videoId, template, temperature } = bodySchema.parse(req.body)

    const video = await prisma.video.findUniqueOrThrow({
      where: { id: videoId },
    })

    if (!video.transcription) {
      return res.status(400).send({ error: 'Video has not transcription' })
    }

    const promptMessage = template.replace(
      '{transcription}',
      video.transcription,
    )

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [{ role: 'user', content: promptMessage }],
      stream: true,
    })

    const stream = OpenAIStream(response)

    streamToResponse(stream, res.raw, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
    })
  })
}
