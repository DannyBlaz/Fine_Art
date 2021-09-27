import { useState, useEffect } from "react";
import PostContainer from './PostContainer.js';
import PostFrom from './PostForm.js';

function Post() {
    const [postArray, setPostArray] = useState([]);

    useEffect(() =>{
        fetch("/posts")
        .then(resp => resp.json())
        .then(data => setPostArray(data))
    },[])

    
    return (
        <div className="Post">
            <h1>Post</h1>
            {postArray.map(post => <PostContainer post={post} key={ post.id } />)}
            <PostFrom setPostArray={setPostArray} />
        </div>
    );
}

export default Post;