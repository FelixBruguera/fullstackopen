import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import NewBlog from '../components/NewBlog'

test('it calls the event handler with the right data', async () => {
  const handleNewBlog = vi.fn()
  const user = userEvent.setup()
  const { container } = render(<NewBlog postBlog={ handleNewBlog }/>)
  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')
  const submit = screen.getByText('Save')

  await user.type(title, 'Testing the form')
  await user.type(author, 'Tester')
  await user.type(url, 'test.com')
  await user.click(submit)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  const data = handleNewBlog.mock.calls[0][0]
  expect(data.title).toBe('Testing the form')
  expect(data.author).toBe('Tester')
  expect(data.url).toBe('test.com')
})