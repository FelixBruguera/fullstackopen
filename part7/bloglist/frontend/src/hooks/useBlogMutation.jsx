import { useQueryClient, useMutation } from '@tanstack/react-query'
import { handleNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { blogService } from '../services/axios'

const useBlogMutation = () => {
  const client = useQueryClient()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }

  const create = useMutation({
    mutationFn: (data) => blogService.post('/', data, config),
    onSuccess: (response) => {
      const data = response.data
      client.setQueryData(['blogs'], (old) => old.concat(data))
      dispatch(
        handleNotification(
          `Succesfully added ${data.title} by ${data.author}`,
          'info',
        ),
      )
    },
    onError: (error) =>
      dispatch(handleNotification(error.response.data, 'error')),
  })

  const update = useMutation({
    mutationFn: (data) => blogService.put(`/${data.id}`, data, config),
    onSuccess: (response) => {
      const data = response.data
      client.setQueryData(['blog', data.id], () => data),
        dispatch(
          handleNotification(
            `Succesfully updated ${data.title} by ${data.author}`,
            'info',
          ),
        )
    },
    onError: (error) => dispatch(handleNotification(error.message, 'error')),
  })

  const remove = useMutation({
    mutationFn: (data) => blogService.delete(`/${data.id}`, config),
    onMutate: (data) => {
      data
    },
    onSuccess: (response, context) => {
      dispatch(
        handleNotification(
          `Succesfully deleted ${context.title} by ${context.author}`,
          'info',
        ),
      )
      navigate('/')
    },
    onError: (error) => {
      dispatch(handleNotification(error.message, 'error'))
    },
  })

  const comment = useMutation({
    mutationFn: (data) =>
      blogService.post(`/${data.id}/comments`, data, config),
    onSuccess: (response) => {
      const data = response.data
      client.setQueryData(['blog', data.id], () => data),
        dispatch(
          handleNotification(
            `Succesfully added a comment to ${data.title}`,
            'info',
          ),
        )
    },
    onError: (error) =>
      dispatch(handleNotification(error.response.data, 'error')),
  })

  const service = {
    create,
    update,
    remove,
    comment,
  }

  return service
}

export default useBlogMutation
