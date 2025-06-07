const loginWith = async (page, username, password) => {
    await page.getByRole('textbox', {name: 'Username'}).fill(username)
    await page.getByRole('textbox', {name: 'Password'}).fill(password)
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
    await page.getByRole('link', {name: blogName}).click()
    for (let i = 1; i < times+1; i++) {
        await page.getByRole('button', { name: 'Like' }).click()
        await page.getByText(`${i} Likes`).waitFor()
    }
    await page.getByRole('link', {name: "Blogs"}).click()
}

module.exports = { loginWith, createBlog, likeBlog }