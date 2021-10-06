import PostCard from './PostCard.js';

function PostContainer({ post, setSinglePost }) {
    // console.log(post.comments);

    function handleClick(){
        setSinglePost(post)
    }

    return (
        <div className="post-container" onClick={handleClick}>
            <hr/>
            <PostCard post={post}  />
        </div>
    );
}

export default PostContainer;