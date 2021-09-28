import { useState } from "react";

function PostCard({ post, currentUser, setNewComment }) {
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState([]);

    function manageCommentForm(e){
        e.preventDefault()
        setBody(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch(`/comments`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                body: body,
                post_id: post.id,
                user_id: currentUser.id
            }),
        })
        .then((resp) => resp.json())
        .then((data) => {
            // console.log(data.body)
            if (Array.isArray(data.body)){
                setErrors(Object.values(data.body).flat())
            }else{
                console.log(...post.comments, data)
                setNewComment((prevComment) => [data, ...prevComment]);
            }
        });
        e.target.reset();
    }

    return (
        <div className="PostCard">
            <div className="post-owner">
                <img
                    src={post.user.profile_picture}
                    alt="user-profile_picture"
                    style={{
                        maxWidth: 50, marginLeft: "auto",
                        marginRight: "auto"
                    }}
                />
                <h1>{post.user.username}</h1>
            </div>
            <div className="post">
                <img
                    src={post.image}
                    alt="post"
                />
                <h2>{post.title}</h2>
                <p>{post.description}</p>
            </div>
            <div className="post-comment">
                <form onSubmit={handleSubmit}>
                    Comment: <input type="text" name="body" placeholder="Add a comment..." onChange={manageCommentForm}/>
                        <input type="submit"/>
                    {errors.map(error => <div>{error}</div>)}
                </form>
            </div>
        </div>
    );
}

export default PostCard;