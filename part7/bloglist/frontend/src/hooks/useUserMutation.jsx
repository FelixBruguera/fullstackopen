import { userService } from '../services/axios'
import useHeaders from './useHeaders'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { handleNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const useUserMutation = (id) => {
  const client = useQueryClient()
  const config = useHeaders()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const create = useMutation({
    mutationFn: async (credentials) => {
      await userService.post('/', credentials, config)
    },
    onSuccess: (response) => {
      dispatch(handleNotification('Succesfully created your account', 'info'))
      return navigate('/')
    },
    onError: (error) => {
      return dispatch(
        handleNotification(
          error.response.data || error.response.data.error,
          'error',
        ),
      )
    },
  })

  return create
}

export default useUserMutation
