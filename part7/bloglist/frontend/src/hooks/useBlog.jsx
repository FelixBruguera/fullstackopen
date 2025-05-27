import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const useBlog = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => blogService.get(id),
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useBlog