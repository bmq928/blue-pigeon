import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {
  BEARER_TOKEN_LOCAL_STORAGE_KEY,
  BEARER_TOKEN_QUERY_KEY,
} from './use-bearer-token'

export type RegisterVerifyParam = { key: string }
export function useRegisterVerify() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: RegisterVerifyParam) => {
      const resp = await fetch(`/api/v1/users/email/verify/${body.key}`, {
        method: 'GET',
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
