import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const useUsers = () => {

  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useUsers