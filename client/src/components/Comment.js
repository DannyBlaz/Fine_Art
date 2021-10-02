import { useState } from "react";

function Comment({ post }) {
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState([]);
    const [newComments, setNewComments] = useState(post.comments)

    function manageCommentForm(e) {
        e.preventDefault()
        setBody(e.target.value)
    }

    function handleSubmit(e) {
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
                user_id: localStorage.user
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                // console.log(data);
                if (data.errors) {
                    setErrors(data.errors)
                } else {
                    setNewComments((prevComments) => [data, ...prevComments])
                    // window.location.reload();
                }
            });
        e.target.reset();
    }

    return (
        <div className="comment">
            <div className="post-comment">
                <form onSubmit={handleSubmit}>
                    Comment: <input type="text" name="body" placeholder="Add a comment..." onChange={manageCommentForm} />
                    <input type="submit" />
                    {errors.map(error => <div>{error}</div>)}
                </form>
            </div>
            <h3>Comments</h3>
            {newComments ? (
                <ul>{newComments.map(comment => <li key={comment.id} className="lead">{comment.body}</li>)}</ul>)
                : null}
        </div>
    );
}

export default Comment;
