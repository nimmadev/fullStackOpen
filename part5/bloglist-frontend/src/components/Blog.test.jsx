import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

describe(('Blog render'), () => {

  const blog = {
    'title': 'test 1',
    'author': 'nimma',
    'url': 'test',
    'likes': 2,
    'user': {
      'username': 'rooot',
      'name': 'Superuser',
      'id': '69f62f95728e0fb79760a766'
    },
    'id': '69f63c0ea9cd5f14f5d136ea'
  }

  test('title and author by default', () => {
    render(< Blog blog={blog} />)
    screen.getByText('test 1 nimma')
  })

  test('does not render title and author by default', () => {
    render(<Blog blog={blog} />)
    const result = screen.queryByText('test')
    expect(result).toBeNull()
  })

  test('url and like is show after show button click', async () => {
    render(<Blog blog={blog} user={blog.user} />)
    const button = screen.getByText('show')
    const user = userEvent.setup()
    await user.click(button)
    screen.getByText('test')
    screen.getByText('2')
  })

  test('like button click twice received', async () => {
    const fn = vi.fn()
    render(<Blog blog={blog} user={blog.user} updateLike={fn} />)
    const button = screen.getByText('show')
    const user = userEvent.setup()
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(fn.mock.calls).toHaveLength(2)
  })
})