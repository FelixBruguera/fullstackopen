import { useSelector } from 'react-redux'

const useHeaders = () => {
  const user = useSelector((state) => state.user)
  return {
    headers: { Authorization: `Bearer ${user.token}` },
  }
}

export default useHeaders
