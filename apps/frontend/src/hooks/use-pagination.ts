import { useState } from 'react'

export const PER_PAGE = 10

export function usePagination() {
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const nextPage = () =>
    setCurrentPage((v) => (v + 1 >= totalPage ? totalPage : v + 1))
  const prevPage = () => setCurrentPage((v) => (v - 1 <= 1 ? 1 : v - 1))

  return {
    currentPage,
    setCurrentPage,
    totalPage,
    setTotalPage,
    prevPage,
    nextPage,
  }
}
