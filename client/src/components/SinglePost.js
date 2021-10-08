import Comment from './Comment.js';

function SinglePost({ post }){
    // console.log(post)
    return (
        <div className="single-post" >
            <div className="single-post-owner">
                <img
                    src={post.user.profile_picture}
                    alt="user-profile_picture"
                />
                <h1>{post.user.username}:</h1>
            </div>
            <div className="post">
                <img
                    className="single-post-img"
                    src={post.image}
                    alt="post"
                />
                <h2>{post.title}</h2>
                <h3>{post.category}</h3>
                <p><h3>Description:</h3> {post.description}</p>
            </div>
            <Comment post={ post } />
        </div>
    )
}

export default SinglePost;