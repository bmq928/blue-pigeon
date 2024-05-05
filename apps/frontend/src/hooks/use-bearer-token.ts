import { useQuery } from '@tanstack/react-query'

export const BEARER_TOKEN_QUERY_KEY = 'BEARER_TOKEN_QUERY_KEY'
export const BEARER_TOKEN_LOCAL_STORAGE_KEY = 'authToken'
export function getBearerToken() {
  const token = localStorage.getItem(BEARER_TOKEN_LOCAL_STORAGE_KEY) ?? ''
  const { _id: userId, email } = JSON.parse(atob(token.split('.')[1] ?? 'e30='))
  return {
    token,
    userId,
    email,
  }
}
export function useBearerToken() {
  return useQuery({
    queryKey: [BEARER_TOKEN_QUERY_KEY],
    queryFn: getBearerToken,
  })
}
