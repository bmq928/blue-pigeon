import { useQuery } from '@tanstack/react-query'
import { getBearerToken } from './use-bearer-token'
import { useLogout } from './use-logout'

enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}
export type GetUserFriendAvailableProps = {
  page?: number
  perPage?: number
}
export type GetUserFriendAvailableResponse = {
  data: {
    _id: string
    credential: {
      email: string
    }
    profile: {
      firstName: string
      lastName: string
      favSport?: string
      favSportPersonality?: string
      favSportTeam?: string
      createdAt?: Date
      updatedAt?: Date
    }
    friends?: string[]
    friendRequests: string[]
  }[]

  pageInfo: {
    total: number
    page: number
    perPage: number
    sort: SortEnum
    sortBy: string
  }
}
export const USER_FRIEND_AVAILABLE_KEY = 'USER_FRIEND_AVAILABLE_KEY'
export function useUserFriendsAvailable({
  page = 1,
  perPage = 10,
}: GetUserFriendAvailableProps = {}) {
  const { mutate: logout } = useLogout()

  return useQuery({
    queryKey: [USER_FRIEND_AVAILABLE_KEY, { page, perPage }],
    queryFn: async (): Promise<GetUserFriendAvailableResponse> => {
      const { token } = getBearerToken()
      const resp = await fetch(
        `/api/v1/users/friends/available?page=${page}&perPage=${perPage}`,
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
