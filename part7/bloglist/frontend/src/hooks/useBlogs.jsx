import { useQuery } from '@tanstack/react-query'
import { blogService } from '../services/axios'
import useHeaders from './useHeaders'

const useBlogs = () => {
  const config = useHeaders()
  const { data, error, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await blogService.get('/', config)
      return response.data
    },
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useBlogs
