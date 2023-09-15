import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { getPromptsRoute } from './routes/get-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscriptionRoute } from './routes/create-transcription'
import { createAICompletionRoute } from './routes/create-ai-completion'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(getPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(createAICompletionRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running on port 3333')
})
