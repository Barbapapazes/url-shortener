export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'short')

  const value = await useStorage<string>('data').getItem(id)

  if (!value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }

  return sendRedirect(event, value)
})
