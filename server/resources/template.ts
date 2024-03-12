interface LayoutProps {
  body: string
  head: string[]
}

export function withTemplate(props: LayoutProps) {
  const { head, body } = props

  return /* html */`<html>
      <head>
       <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />
        ${head.join('\n')}
      </head>
      <body>
        <header class="container">
          <h1>
            <a href="/">URL Shortener with Nitro</a>
          </h1>
        </header>
        <main class="container">
          ${body}
        </main>
      </body>
    </html>`
}
