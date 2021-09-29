
function User({ user }) {
    return (
        <div className="user">
            <img
                src={user.profile_picture}
                alt="profile_picture"
                style={{
                    maxWidth: 250, marginLeft: "auto",
                    marginRight: "auto"
                }}
            />
            <h1>{user.username}</h1>
            <h3>{user.artist_type}</h3>
            <p>{user.about}</p>
            <br/>
            <h3>Posts</h3>
            {user.posts ? (
                <ul>{user.posts.map(post => <li>{post.title}</li>)}</ul>
            ): null}
        </div>
    );
}

export default User;