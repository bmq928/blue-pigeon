import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getBearerToken } from './use-bearer-token'
import { useLogout } from './use-logout'
import { USER_FRIEND_AVAILABLE_KEY } from './use-user-friend-available'
import { USERS_FRIEND_REQUEST_QUERY_KEY } from './use-user-friend-requests'

export type CreateFriendRequestBody = {
  friendId: string
}
export type CreateFriendRequestResponse = {
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
export function useUserFriendRequestCreate() {
  const { mutate: logout } = useLogout()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      body: CreateFriendRequestBody,
    ): Promise<CreateFriendRequestResponse> => {
      const { token } = getBearerToken()
      const resp = await fetch(`/api/v1/users/friends/requests`, {
        method: 'POST',
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_FRIEND_REQUEST_QUERY_KEY],
      })
      queryClient.invalidateQueries({
        queryKey: [USER_FRIEND_AVAILABLE_KEY],
      })
    },
    onError: (err) => toast.error(err.message),
  })
}
