import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/axios'
import useHeaders from './useHeaders'

const useUsers = () => {
  const config = useHeaders()
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userService.get('/', config)
      return response.data
    },
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useUsers
