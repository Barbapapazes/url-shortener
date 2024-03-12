import { z } from 'zod'
import { hash } from 'ohash'
import { Helmet, h, renderSSR } from 'nano-jsx'
import { withTemplate } from '../resources/template'

export default defineEventHandler({
  onBeforeResponse: async (event) => {
    const requestURL = getRequestURL(event).origin
    const origin = getRequestHeader(event, 'origin')

    if (!origin) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
      })
    }

    if (origin !== requestURL) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
      })
    }
  },
  handler: async (event) => {
    const body = await readValidatedBody(event, z.object({
      url: z.string().url(),
    }).parse)

    const requestURL = getRequestURL(event)
    const id = hash(body.url)
    const shortenURL = new URL(`/${id}`, requestURL).href

    await useStorage('data').setItem(id, body.url)

    const App = () => {
      return (
        <div>
          <Helmet>
            <title>Created</title>
          </Helmet>
          <h2>Created and Ready</h2>
          <input
            type="text"
            value={shortenURL}
            autofocus
          />
        </div>
      )
    }

    const app = renderSSR(<App />)
    const { body: nanoBody, head } = Helmet.SSR(app)

    return withTemplate({
      body: nanoBody,
      head,
    })
  },
})
