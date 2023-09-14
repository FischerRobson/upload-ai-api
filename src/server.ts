import { fastify } from 'fastify'
import { getPromptsRoute } from './routes/get-prompts'
import { uploadVideoRoute } from './routes/upload-video'

const app = fastify()

app.register(getPromptsRoute)
app.register(uploadVideoRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running on port 3333')
})
