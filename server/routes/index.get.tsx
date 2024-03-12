import { Helmet, h, renderSSR } from 'nano-jsx'

export default defineEventHandler(() => {
  const App = () => {
    return (
      <div>
        <Helmet>
          <title>URL Shortener with Nitro</title>
        </Helmet>
        <h2>Shorten an URL</h2>
        <form action="/create" method="POST">
          <input type="url" name="url" placeholder="URL to shorten" autocomplete="off" />
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
  const app = renderSSR(<App />)
  const { body, head } = Helmet.SSR(app)

  return withTemplate({
    body,
    head,
  })
})
