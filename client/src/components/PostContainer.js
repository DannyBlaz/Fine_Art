import PostCard from './PostCard.js';
import Comment from './Comment.js';

function PostContainer({ post }) {
    return (
        <div className="postContainer">
            <hr/>
            <PostCard post={ post }/>
            <Comment comments={ post.comments }/>
        </div>
    );
}

export default PostContainer;