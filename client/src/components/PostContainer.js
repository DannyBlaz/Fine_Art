import PostCard from './PostCard.js';
import Comment from './Comment.js';
import { useState } from "react";

function PostContainer({ post, currentUser }) {
    const [newComment, setNewComment] = useState([])
    let allComments = [post.comments.push(newComment)]
    console.log(post.comments)
    return (
        <div className="postContainer">
            <hr/>
            <PostCard post={ post } setNewComment={ setNewComment }currentUser={currentUser} />
            <Comment comments={ newComment.length > 0 ? allComments : post.comments}/>
        </div>
    );
}

export default PostContainer;