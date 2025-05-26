const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', {name: 'Send'}).click()
}

const createBlog = async (page, data) => {
    await page.getByRole('button', {name: 'New Blog'}).click()
    await page.getByLabel('title').fill(data.title)
    await page.getByLabel('author').fill(data.author)
    await page.getByLabel('url').fill(data.url)
    await page.getByText('Save').click()
    await page.getByText(data.title, {exact: true}).waitFor()
}

const likeBlog = async (page, blogName, times) => {         
    await page.locator('.blog').filter({ hasText: blogName}).locator('button').click()
    for (let i = 1; i < times+1; i++) {
        await page.getByRole('button', { name: 'Like' }).click()
        await page.getByText(`Likes: ${i}`).waitFor()
    }
    await page.getByRole('button', { name: 'Close' }).click()
}

module.exports = { loginWith, createBlog, likeBlog }