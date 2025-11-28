const { test, expect, describe, beforeEach, beforeAll } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helpers')

beforeEach( async ({ page, request })=> {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data: {
          name: 'Dev',
          username: 'root',
          password: 'securepassword'
        }
      })
})

describe('Blog app', async () => {
    beforeEach( async ({ page }) => {
        await page.goto('/')
    })

    test('the login form is rendered', async ({ page }) => {
        const locator = await page.getByText('Log in')
        const form = await page.locator('form')
        await expect(locator).toBeVisible()
        await expect(form).toBeVisible()
    })

    test('the sign up form creates a user', async ({ page }) => {
        await page.getByRole('button', {name: 'Sign up'}).click()
        await page.getByRole('textbox', {name: 'Name', exact: true}).fill('Testing')
        await page.getByRole('textbox', {name: 'Username'}).fill('testing')
        await page.getByRole('textbox', {name: 'Password'}).fill('testingpass')
        await page.getByRole('button', {name: 'Send'}).click()
        await expect(page.getByText('Succesfully created your account')).toBeVisible()
    })

    describe('with valid credentials', () => {
        test('the user can log in', async ({ page }) => {
            await loginWith(page, 'root', 'securepassword')
            await expect(page.getByText('Succesfully logged in')).toBeVisible()
            const locator = await page.getByText('Dev logged in')
            await expect(locator).toBeVisible()
        })
    })

    describe('with invalid credentials', () => {
        test('the login form renders the correct error message', async ({ page }) => {
            await loginWith(page, 'root', 'wrong')
            await expect(page.getByText('Invalid username or password')).toBeVisible()
            await expect(page.getByText('Dev logged in')).not.toBeVisible()
        })
        test('when the username is not unique, the sign up form returns the correct messsage', async ({ page }) => {
            await page.getByRole('button', {name: 'Sign up'}).click()
            await page.getByRole('textbox', {name: 'Name', exact: true}).fill('Testing')
            await page.getByRole('textbox', {name: 'Username'}).fill('root')
            await page.getByRole('textbox', {name: 'Password'}).fill('testingpass')
            await page.getByRole('button', {name: 'Send'}).click()
            await expect(page.getByText('expected `username` to be unique')).toBeVisible()
        })
        test('when the password is too short, the sign up form returns the correct messsage', async ({ page }) => {
            await page.getByRole('button', {name: 'Sign up'}).click()
            await page.getByRole('textbox', {name: 'Name', exact: true}).fill('Testing')
            await page.getByRole('textbox', {name: 'Username'}).fill('testing')
            await page.getByRole('textbox', {name: 'Password'}).fill('te')
            await page.getByRole('button', {name: 'Send'}).click()
            await expect(page.getByText('Path `password` is shorter than the minimum allowed length (3)')).toBeVisible()
        })
    })

    describe('when logged in', () => {
        beforeEach( async ({ page }) => {
            await loginWith(page, 'root', 'securepassword')
        })
        test('the user can create a blog', async ({ page }) => {
            await createBlog(page, { title: 'Test Blog', author: 'Tester', url: 'test.com' })
            await expect(page.getByText('Test Blog', {exact: true})).toBeVisible()
            await expect(page.getByText('Tester', {exact: true})).toBeVisible()
        })
        describe('with some blogs in the database', async (page) => {
            beforeEach( async({ page}) => {
                await createBlog(page, { title: 'Test Blog', author: 'Tester', url: 'test.com' })
                await createBlog(page, { title: 'Second Blog', author: 'Another tester', url: 'second.com' })
                await createBlog(page, { title: 'Loren Ipsum', author: 'dolor sit amet', url: 'lipsum.com' })
            })
            test('a blog can be liked', async ({ page }) => {
                page.getByRole('link', {name: 'Second Blog'}).click()
                await page.getByRole('button', { name: 'Like' }).click()
                await expect(page.getByText('Likes', {exact: false})).toContainText('1 Likes')
            })
            test('the user who added a blog can delete it', async ({ page }) => {
                page.on('dialog', dialog => dialog.accept())
                page.getByRole('link', {name: 'Loren Ipsum'}).click()
                await page.getByRole('button', { name: 'Delete' }).click()
                await page.getByRole('button', { name: 'Confirm' }).click()
                await expect(page.getByRole('link', {name: 'Second Blog'})).toBeVisible()
                await expect(page.getByRole('link', {name: 'Loren Ipsum'})).not.toBeVisible()
                await expect(page.getByText('Succesfully Deleted', {exact: false})).toBeVisible()
            })
            test('the blogs are sorted by likes', async({ page }) => {
                await likeBlog(page, 'Loren Ipsum', 2)
                await likeBlog(page, 'Second Blog', 1)
                await expect(page.getByRole('listitem').first()).toContainText('Loren Ipsum')
                await page.getByRole('link', {name: 'Loren Ipsum'}).click()
                await expect(page.getByText('Likes', {exact: false})).toHaveText('2 Likes')
                await page.getByRole('link', {name: 'Blogs'}).click()
                await expect(page.getByRole('listitem').last()).toContainText('Test Blog')
                await page.getByRole('link', {name: 'Test Blog'}).click()
                await expect(page.getByText('Likes', {exact: false})).toHaveText('0 Likes')
            })
            test('comments are added', async ({ page }) => {
                page.getByRole('link', {name: 'Second Blog'}).click()
                await page.getByRole('textbox').fill('good blog')
                await page.getByRole('button', {name: 'Send'}).click()
                await expect(page.getByRole('listitem','good blog', {exact: true})).toBeVisible()
            })
        })
    })
    describe('when loged in as a different user', () => {
        beforeEach( async({ page, request }) => {
            await loginWith(page, 'root', 'securepassword')
            await createBlog(page, { title: 'Test Blog', author: 'Tester', url: 'test.com' })
            await page.getByText('Log out').click()
            await request.post('/api/users', {
                data: {
                  name: 'Another',
                  username: 'notroot',
                  password: 'securepassword'
                }
            })
            await loginWith(page, 'notroot', 'securepassword')
        })
        test('the delete button is not rendered', async ({ page }) => {
            await page.getByRole('link', {name: 'Test Blog'}).click()
            await expect(page.getByRole('heading', {name: 'Test Blog'})).toBeVisible()
            await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
        })
    })
})