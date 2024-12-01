import useAsync from "../hooks/useAsync";
import './Loader.css'
import './PostList.css'

const fetchData = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Помилка при отриманні данних')
    }
    return response.json();
}

const fetchPosts = () => fetchData('https://jsonplaceholder.typicode.com/posts');

const PostList = () => {
    const {loading: loadingPosts, error: postsFetchError, value: posts, execute: fetchPost} = useAsync(fetchPosts, []);

    if (loadingPosts) return <div class="loader"></div>
    if (postsFetchError) return <div>Error: {error.message}</div>

    return (
        <>
            <div className="post-list">
                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                    <img
                        src={`https://via.placeholder.com/150/${post.id}a`} // Генеруємо URL зображення
                        alt={post.title}
                        className="post-image"
                    />
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-body">{post.body}</p>
                    </div>
                ))}
            </div>
            <button onClick={fetchPost}>Fetch Posts</button>
        </>
    )
}

export default PostList;