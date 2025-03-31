const NewBlog = ({ title, setTitle, author, setAuthor, url, setUrl, onSubmit }) => {
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <label htmlFor="title">Title: </label>
            <input 
                id="title" 
                type="text" 
                value={title} 
                onChange={({ target}) => setTitle(target.value)}>
            </input>
            <label htmlFor="author">Author: </label>
            <input 
                id="author" 
                type="text" 
                value={author} 
                onChange={({ target}) => setAuthor(target.value)}>
            </input>
            <label htmlFor="url">Url: </label>
            <input 
                id="url" 
                type="text" 
                value={url} 
                onChange={({ target}) => setUrl(target.value)}>
            </input>
            <button type="submit">Save</button>
        </form>
    )
}

export default NewBlog