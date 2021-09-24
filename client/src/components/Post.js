import PostAuthor from './PostAuthor.js';
import PostContainer from './PostContainer.js';
import PostFrom from './PostForm.js';

function Post() {
    return (
        <div className="Post">
            <h1>Post</h1>
            <PostAuthor/>
            <PostContainer/>
            <PostFrom/>
        </div>
    );
}

export default Post;