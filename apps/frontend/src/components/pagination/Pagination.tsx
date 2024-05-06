import { PageNumber } from './PageNumber'

export type PaginationProps = {
  totalPage: number
  curPage: number
  setCurrent: (page: number) => void
  next: () => void
  prev: () => void
}
export function Pagination({
  curPage,
  next,
  prev,
  setCurrent,
  totalPage,
}: PaginationProps) {
  const pages = [...Array(totalPage)].map((_, idx) => idx + 1)
  return (
    <nav className="flex justify-center" aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={prev}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <PageNumber
            key={page}
            onClick={() => setCurrent(page)}
            isCurrent={curPage === page}
            page={page}
          />
        ))}
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={next}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}
