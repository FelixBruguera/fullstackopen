import { useQuery } from '@tanstack/react-query'
import { blogService } from '../services/axios'

const useBlogs = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await blogService.get('/')
      return response.data
    },
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useBlogs
