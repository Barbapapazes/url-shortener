import { z } from 'zod'
import { hash } from 'ohash'

// eslint-disable-next-line unused-imports/no-unused-imports
import { Helmet, h, renderSSR } from 'nano-jsx'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, z.object({
    url: z.string().url(),
  }).parse)

  const requestURL = getRequestURL(event)
  const id = hash(body.url)
  const shortenURL = new URL(`/${id}`, requestURL).href

  await useStorage('db').setItem(id, body.url)

  const App = () => {
    return (
      <div>
        <Helmet>
          <title>Created</title>
        </Helmet>
        <h2>Created!</h2>
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
})
