import { FastifyInstance } from 'fastify'
export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:id/transcription', async (req, res) => {
    const { id } = req.params
  })
}
