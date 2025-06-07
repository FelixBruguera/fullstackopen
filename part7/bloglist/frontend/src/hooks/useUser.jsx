import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/axios'
import useHeaders from './useHeaders'

const useUser = (id) => {
  const config = useHeaders()
  const { data, error, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await userService.get(`/${id}`, config)
      return response.data
    },
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useUser
