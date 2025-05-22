import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('renders a blog', () => {
  const testBlog = {
    title: 'Testing react',
    author: 'Vitest',
    url: 'www.vitest.com',
    likes: 2,
  }
  const { container } = render(<Blog blog={testBlog} />)

  const element = container.querySelector('.blog')
  const title = screen.getByText(testBlog.title)
  const author = screen.getByText(testBlog.author)
  const url = screen.queryByText(testBlog.url)
  const likes = screen.queryByText(testBlog.likes)
  const detailsButton = screen.getByText('View Details')
  expect(element).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(author).toBeInTheDocument()
  expect(url).not.toBeInTheDocument()
  expect(likes).not.toBeInTheDocument()
  expect(detailsButton).toBeInTheDocument()
})

test('shows the blogs details when clicked', async () => {
  const testBlog = {
    title: 'Testing react',
    author: 'Vitest',
    url: 'www.vitest.com',
    likes: 2,
  }
  const { container } = render(<Blog blog={testBlog} />)
  const user = userEvent.setup()
  const detailsButton = screen.getByText('View Details')
  await user.click(detailsButton)

  const url = screen.queryByText(testBlog.url)
  const likes = screen.queryByText('2', { exact: false })
  const likeButton = screen.queryByText('Like')
  const deleteButton = screen.queryByText('Delete')
  expect(url).toBeInTheDocument()
  expect(likes).toBeInTheDocument()
  expect(likeButton).toBeInTheDocument()
  expect(deleteButton).toBeInTheDocument()
})

test('the like button calls the passed function', async () => {
  const testBlog = {
    title: 'Testing react',
    author: 'Vitest',
    url: 'www.vitest.com',
    likes: 2,
  }
  const onLike = vi.fn()
  const { container } = render(<Blog blog={testBlog} putBlog={onLike} />)
  const user = userEvent.setup()
  const detailsButton = screen.getByText('View Details')
  await user.click(detailsButton)
  const likeButton = screen.queryByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(onLike.mock.calls).toHaveLength(2)
})
