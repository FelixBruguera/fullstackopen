import { useQuery } from '@tanstack/react-query'
import { blogService } from '../services/axios'

const useBlog = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const response = await blogService.get(`/${id}`)
      return response.data
    },
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useBlog
