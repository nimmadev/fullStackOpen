const { test, expect, describe, beforeEach } = require('@playwright/test')
const { title } = require('node:process')

const LoginUser = async (page, username, password) => {
  await page.goto('/login')
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button').click()
}

const CreateBlog = async (page, data) => {
  await page.getByRole('link', { name: 'create new' }).click();
  await expect(page.getByRole('heading', { name: 'create new' })).toBeVisible()
  await page.getByLabel('title:').fill(data.title)
  await page.getByLabel('author:').fill(data.author)
  await page.getByLabel('url:').fill(data.url)
  await page.getByRole('button', { name: 'create' }).click()
}
describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    // setup db reset
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'nimma1',
        name: 'nimma',
        password: 'nimmanimma'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      await LoginUser(page, 'nimma1', 'nimmanimma')
      await expect(page.getByText('blogs')).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
      await LoginUser(page, 'nimma', 'nimmanimma')
      const errorText = page.getByText('invalid username or password')
      await expect(errorText).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await LoginUser(page, 'nimma1', 'nimmanimma')
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await CreateBlog(page, { title: 'test blog', author: 'nimma', url: 'test' })
      await expect(page.getByText('a new blog test blog by nimma')).toBeVisible()
      await expect(page.getByRole('link', { name: 'test blog' })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await CreateBlog(page, { title: 'test blog', author: 'nimma', url: 'test' })
      await page.getByRole('link', { name: 'test blog' }).click()
      await page.getByText('like').click()
      await expect(page.getByText('likes 1')).toBeVisible()

    })

    test('a blog can be deleted', async ({ page }) => {
      await CreateBlog(page, { title: 'test blog', author: 'nimma', url: 'test' })
      await page.getByRole('link', { name: 'test blog' }).click()
      page.once('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'delete' }).click()
      await expect(page.getByText('test blog', { exact: true })).toBeHidden()
    })

    test('only blog owner see delete button', async ({ page, request }) => {
      await CreateBlog(page, { title: 'test blog', author: 'nimma', url: 'test' })

      await page.getByText('logout').click()
      await request.post('/api/users', {
        data: {
          username: 'nimma',
          name: 'nimma',
          password: 'nimmanimma'
        }
      })
      await LoginUser(page, 'nimma', 'nimmanimma')
      await page.getByRole('link', { name: 'test blog' }).click()
      await expect(page.getByText('delete')).toBeHidden()
    })

    // test('blog are orderd by like', async ({ page }) => {
    //   await CreateBlog(page, { title: 'test blog', author: 'nimma', url: 'test' })
    //   await CreateBlog(page, { title: 'test blog', author: 'nimma', url: 'test' })
    //   await CreateBlog(page, { title: 'test blog9', author: 'nimma', url: 'test' })

    //   await page.getByText(/show/).first().click()
    //   await page.getByText(/show/).nth(1).click()
    //   await page.getByText(/show/).last().click()
    //   await page.getByText('like').last().click()
    //   await page.goto('/')
    //   await page.getByText('show').first().click()
    //   await expect(page.getByText('1')).toBeVisible()


    // })
  })
})