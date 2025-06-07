import { useQueryClient, useMutation } from '@tanstack/react-query'
import { handleNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { blogService } from '../services/axios'
import useHeaders from './useHeaders'
import { useMemo } from 'react'

const useBlogMutation = () => {
  const client = useQueryClient()
  const dispatch = useDispatch()
  const config = useHeaders()

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
    mutationFn: (blog) => blogService.patch(`/${blog.id}`, '', config),
    onSuccess: (response, context) => {
      const newBlog = { ...context, likes: response.data.likes }
      client.setQueryData(['blog', context.id], () => {
        return newBlog
      }),
        client.setQueryData(['blogs'], (oldData) => {
          return oldData.map((blog) =>
            blog.id === newBlog.id ? newBlog : blog,
          )
        }),
        dispatch(
          handleNotification(`Succesfully liked ${context.title}`, 'info'),
        )
    },
    onError: (error) =>
      dispatch(handleNotification(error.response.data, 'error')),
  })

  const remove = useMutation({
    mutationFn: (data) => blogService.delete(`/${data.id}`, config),
    onSuccess: (response, context) => {
      client.setQueryData(['blogs'], (oldData) => {
        return oldData.filter((blog) => blog.id !== context.id)
      })
      dispatch(
        handleNotification(`Succesfully deleted ${context.title}`, 'info'),
      )
    },
    onError: (error) => {
      dispatch(handleNotification(error.response.data, 'error'))
    },
  })

  const comment = useMutation({
    mutationFn: (requestData) =>
      blogService.post(`/${requestData.id}/comments`, requestData, config),
    onSuccess: (response, context) => {
      const newComment = response.data
      client.setQueryData(['blog', context.id], (oldData) => {
        return { ...oldData, comments: oldData.comments.concat(newComment) }
      }),
        dispatch(handleNotification('Succesfully added a comment', 'info'))
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
