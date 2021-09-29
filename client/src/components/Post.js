import { useState, useEffect } from "react";
import PostContainer from './PostContainer.js';
import PostFrom from './PostForm.js';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

function Post() {
    const [postArray, setPostArray] = useState([]);
    const history = useHistory();
    // console.log(postArray);

    useEffect(() =>{
        fetch("/posts")
        .then(resp => resp.json())
        .then(data => setPostArray(data))
    },[])

    
    return (
        <>
            {localStorage.user ? (
            <div className="Post">
                <h1>Post</h1>
                <Link to={"/me"}>
                    <button>Profile</button>
                </Link>
                {postArray.map(post => <PostContainer post={post} key={ post.id } />)}
                <PostFrom setPostArray={setPostArray} />
            </div>
            ) : history.push("/")}
        </>
    );
}

export default Post;