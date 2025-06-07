import { useQuery } from '@tanstack/react-query'
import { blogService } from '../services/axios'
import useHeaders from './useHeaders'

const useBlog = (id) => {
  const config = useHeaders()
  const { data, error, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const response = await blogService.get(`/${id}`, config)
      return response.data
    },
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useBlog
