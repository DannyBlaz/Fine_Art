import PostCard from './PostCard.js';
import Comment from './Comment.js';

function PostContainer() {
    return (
        <div className="postContainer">
            <h1>PostContainer</h1>
            <PostCard />
            <Comment />
        </div>
    );
}

export default PostContainer;