export const setPagination = (
  page: number,
  size: number,
  defaultSize: number
) => {
  const limit = size ? +size : defaultSize
  const offset = page ? page * limit : 0
  return { limit, offset }
}

export const getPagination = (data: any, page: number, limit: number) => {
  const { count: totalItems, rows: row } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)
  return { currentPage, totalItems, totalPages, row }
}
