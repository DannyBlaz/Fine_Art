
function User({ user }) {
    return (
        <div className="user-container">
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
                <div className="user-stats">3 <hr/> 4 <hr/> 5 </div>
                <h3>Artist Type: {user.artist_type}</h3>
                <p>About: {user.about}</p>
                <br/>
                <h3>Projects</h3>
                {user.posts ? (
                    <ul>{user.posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>
                ): null}
            </div>
        </div>
    );
}

export default User;