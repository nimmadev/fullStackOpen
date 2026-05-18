import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogFrom'

test('form function get correct params', async () => {
  const create = vi.fn()
  const hide = {
    current: { toggleVisibility: vi.fn() }
  }

  render(<CreateBlogForm createRef={hide} handleCreate={create} />)
  const title = screen.getByLabelText('title:')
  const author = screen.getByLabelText('author:')
  const url = screen.getByLabelText('url:')
  const button = screen.getByText('create')

  const user = userEvent.setup()
  await user.type(title, 'title')
  await user.type(author, 'author')
  await user.type(url, 'url')

  await user.click(button)

  expect(create.mock.calls[0][0]).toStrictEqual({ title: 'title', author: 'author', url: 'url' })

})