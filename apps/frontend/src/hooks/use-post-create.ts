import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getBearerToken } from './use-bearer-token'
import { useLogout } from './use-logout'
import { POSTS_QUERY_KEY } from './use-posts'

export type CreatePostBody = {
  text: string
  files: Blob[]
}
export type CreatePostResponse = {
  _id?: string
  staticLinks: string[]
  text: string
  createdAt?: Date
  updatedAt?: Date
  createdBy: string
}
export function usePostCreate() {
  const { mutate: logout } = useLogout()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: CreatePostBody): Promise<CreatePostResponse> => {
      const { token } = getBearerToken()
      const formData = new FormData()
      formData.append('text', body.text)
      for (const file of body.files) formData.append('files', file)
      const resp = await fetch(`/api/v1/posts`, {
        method: 'POST',
        body: formData,
        headers: {
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
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] }),
    onError: (err) => toast.error(err.message),
  })
}
