import { useQuery } from '@tanstack/react-query'
import { getBearerToken } from './use-bearer-token'
import { useLogout } from './use-logout'

export type GetUserProfileResponse = {
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
}
export const USER_PROFILE_QUERY_KEY = 'USER_PROFILE_QUERY_KEY'
export function useUserProfile() {
  const { mutate: logout } = useLogout()

  return useQuery({
    queryKey: [USER_PROFILE_QUERY_KEY, {}],
    queryFn: async (): Promise<GetUserProfileResponse> => {
      const { token } = getBearerToken()
      const resp = await fetch(`/api/v1/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const respData = await resp.json()
      if (!resp.ok) {
        if (resp.status === 401) logout()
        throw new Error(respData.message)
      }
      return respData
    },
  })
}
