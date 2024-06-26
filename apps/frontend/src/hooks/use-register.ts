import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { BEARER_TOKEN_QUERY_KEY } from './use-bearer-token'

export type RegisterBody = {
  email: string
  password: string
  firstName: string
  lastName: string
}
export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: RegisterBody) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BEARER_TOKEN_QUERY_KEY] })
    },
    onError: (err) => toast.error(err.message),
  })
}
