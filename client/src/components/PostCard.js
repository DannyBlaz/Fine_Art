
function PostCard({ post }) {

    return (
        <div className="post-card">
            <div className="post-owner">
                <img
                    src={post.user.profile_picture}
                    alt="user-profile_picture"
                />
                <h1>{post.user.username}:</h1>
            </div> 
            <div className="post">
                <img
                    src={post.image}
                    alt="post"
                />
                <h2>{post.title}</h2>
            </div>
        </div>
    );
}

export default PostCard;