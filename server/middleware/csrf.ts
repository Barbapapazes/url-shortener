export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET')
    return

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
})
