import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const useBlogs = () => {
  console.log('Ran blog hook')

  const { data, error, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  return [data, isLoading, error]
}

export default useBlogs
