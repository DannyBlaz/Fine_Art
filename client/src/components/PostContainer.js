import PostCard from './PostCard.js';
import Comment from './Comment.js';
import { useState } from "react";

function PostContainer({ post }) {
    const [newComment, setNewComment] = useState(post.comments)
    // console.log(Array.isArray(post.comments))
    return (
        <div className="postContainer">
            <hr/>
            <PostCard post={post} comments={ post.comments } setNewComment={setNewComment} />
            <Comment comments={ newComment } />
        </div>
    );
}

export default PostContainer;