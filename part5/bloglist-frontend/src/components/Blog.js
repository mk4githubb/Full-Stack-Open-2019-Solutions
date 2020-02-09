import React from 'react'
import './Blog.css'

const Blog = ({blog, syncer}) => {

    const likeHandler = async () => {
        const newBlog = {...blog, likes: blog.likes + 1};

        try {
            const updatedBlog = await syncer.blogsDB.put(blog.id, newBlog);
            const found = syncer.blogs.value.find(i => i.id === blog.id);
            found.likes = updatedBlog.data.likes;
            syncer.blogs.update([...syncer.blogs.value]);
        } catch (exception) {
            syncer.notificationConfig('Error Liking blog');
        }
    };

    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));

    const deleteHandler = async (event, id) => {

        const config = {
            headers: {
                Authorization: `bearer ${loggedInUser.webToken}`
            }
        };

        try {
            await syncer.blogsDB.del(blog.id, config);
            const filtered = syncer.blogs.value.filter(i => i.id !== id);
            syncer.blogs.update(filtered);
        } catch (exception) {
            syncer.notificationConfig('Error Deleting Blog');
        }

    };

    return (
        <div className={'singleBlogContainer'}>
            <h3 id={'blogTitle'}>{blog.title}</h3>
            <p id={'blogBody'}>{blog.text}</p>
            <div id={'blogFooter'}>
                <div>
                    <span><button onClick={likeHandler}>Like</button></span>
                    <span id={'blogLikes'}>{blog.likes} Likes </span>
                </div>
                <div>
                    <span id={'blogAuthor'}>by {blog.author.username}</span>
                    {loggedInUser && loggedInUser.username === blog.author.username ? <span><button
                        onClick={(event) => deleteHandler(event, blog.id)}>Delete</button></span> : null}
                </div>
            </div>
        </div>
    )
};

export default Blog;