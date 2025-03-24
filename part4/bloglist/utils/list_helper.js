const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((cumulative, blog) => cumulative + blog.likes, 0)

const favoriteBlog = (blogs) => {
    const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)
    return sortedBlogs[0]
}

const mostBlogs = (blogs) => {
    let authors = {}
    let result = {author: 'none', blogs: 0}
    blogs.forEach(blog => {
        authors[blog.author] = (authors[blog.author] || 0 ) + 1
        if (authors[blog.author] > result.blogs) {
            result = {author: blog.author, blogs: authors[blog.author]}
        }
    })
    return result
}

const mostLikes = (blogs) => {
    let authors = {}
    let result = {author: 'none', likes: 0}
    blogs.forEach(blog => {
        authors[blog.author] = (authors[blog.author] || 0 ) + blog.likes
        if (authors[blog.author] > result.likes) {
            result = {author: blog.author, likes: authors[blog.author]}
        }
    })
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}