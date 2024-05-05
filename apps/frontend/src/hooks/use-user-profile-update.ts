import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getBearerToken } from './use-bearer-token'
import { useLogout } from './use-logout'
import { USER_PROFILE_QUERY_KEY } from './use-user-profile'

export type UpdateUserProfileBody = {
  firstName?: string
  lastName?: string
  favSport: string
  favSportPersonality: string
  favSportTeam?: string
}
export type UpdateUserProfileResponse = {
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
export function useUserProfileUpdate() {
  const { mutate: logout } = useLogout()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      body: UpdateUserProfileBody,
    ): Promise<UpdateUserProfileResponse> => {
      const { token } = getBearerToken()
      const resp = await fetch(`/api/v1/users/profile`, {
        method: 'PUT',
        body: JSON.stringify(body),
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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [USER_PROFILE_QUERY_KEY] }),
    onError: (err) => toast.error(err.message),
  })
}
