import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { handleNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const useBlogMutation = () => {
  const client = useQueryClient()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const create = useMutation({
    mutationFn: (data) => blogService.create(data, user.token),
    onSuccess: (response) => {
      client.setQueryData(['blogs'], (old) => old.concat(response))
      dispatch(
        handleNotification(
          `Succesfully added ${response.title} by ${response.author}`,
          'info',
        ),
      )
    },
    onError: (error) =>
      dispatch(handleNotification(error.response.data, 'error')),
  })

  const update = useMutation({
    mutationFn: (data) => blogService.update(data, user.token),
    onSuccess: (response) => {
      client.setQueryData(['blog', response.id], () => response),
      dispatch(
        handleNotification(
          `Succesfully updated ${response.title} by ${response.author}`,
          'info',
        ),
      )
    },
    onError: (error) =>
      dispatch(handleNotification(error.response.data, 'error')),
  })

  const remove = useMutation({
    mutationFn: (data) => blogService.remove(data, user.token),
    onMutate: (data) => {
      data
    },
    onSuccess: (response, context) => {
      client.removeQueries(['blog', context.id])
      dispatch(
        handleNotification(
          `Succesfully deleted ${context.title} by ${context.author}`,
          'info',
        ),
      )
      navigate('/')
    },
    onError: (error) =>
      dispatch(handleNotification(error.response.data, 'error')),
  })

  const service = {
    create,
    update,
    remove,
  }

  return service
}

export default useBlogMutation
