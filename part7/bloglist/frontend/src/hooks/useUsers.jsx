import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/axios'

const useUsers = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userService.get('/')
      return response.data
    },
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useUsers
