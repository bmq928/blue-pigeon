import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {
  BEARER_TOKEN_LOCAL_STORAGE_KEY,
  BEARER_TOKEN_QUERY_KEY,
} from './use-bearer-token'

export type UseRegisterProps = { email: string; password: string }
export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: UseRegisterProps) => {
      const resp = await fetch('/api/v1/users/register', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const respData = await resp.json()
      if (!resp.ok) throw new Error(respData.message)
      return respData
    },
    onSuccess: (data: { accessToken: string }) => {
      localStorage.setItem(BEARER_TOKEN_LOCAL_STORAGE_KEY, data.accessToken)
      queryClient.invalidateQueries({ queryKey: [BEARER_TOKEN_QUERY_KEY] })
    },
    onError: (err) => toast.error(err.message),
  })
}
