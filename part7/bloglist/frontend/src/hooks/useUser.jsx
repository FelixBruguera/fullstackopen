import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/axios'

const useUser = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
        const response = await userService.get(`/${id}`)
        console.log(response)
        return response.data
    },
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useUser