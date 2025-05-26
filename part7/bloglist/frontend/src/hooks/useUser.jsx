import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const useUser = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => userService.get(id),
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useUser