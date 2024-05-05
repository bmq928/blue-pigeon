import { useQuery } from '@tanstack/react-query'
import { getBearerToken } from './use-bearer-token'
import { useLogout } from './use-logout'

export enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}
export type GetPostsProps = {
  page?: number
  perPage?: number
}
export type GetPostsResponse = {
  data: {
    createdBy: string
    staticLinks: string[]
    text: string
    _id?: string
    createdAt: Date
    updatedAt: Date
  }[]

  pageInfo: {
    total: number
    page: number
    perPage: number
    sort: SortEnum
    sortBy: string
  }
}
export const POSTS_QUERY_KEY = 'POSTS_QUERY_KEY'
export function usePosts({ page = 1, perPage = 10 }: GetPostsProps = {}) {
  const { mutate: logout } = useLogout()

  return useQuery({
    queryKey: [POSTS_QUERY_KEY, {}],
    queryFn: async (): Promise<GetPostsResponse> => {
      const { token } = getBearerToken()
      const resp = await fetch(
        `/api/v1/posts?page=${page}&perPage=${perPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const respData = await resp.json()
      if (!resp.ok) {
        if (resp.status === 401) logout()
        throw new Error(respData.message)
      }
      return respData
    },
  })
}
