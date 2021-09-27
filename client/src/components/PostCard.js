
function PostCard({ post }) {
    return (
        <div className="PostCard">
            <div className="post-owner">
                <img
                    src={post.user.profile_picture}
                    alt="user-profile_picture"
                    style={{
                        maxWidth: 50, marginLeft: "auto",
                        marginRight: "auto"
                    }}
                />
                <h1>{post.user.username}</h1>
            </div>
            <div className="post">
                <img
                    src={post.image}
                    alt="post"
                />
                <h2>{post.title}</h2>
                <p>{post.description}</p>
            </div>
        </div>
    );
}

export default PostCard;