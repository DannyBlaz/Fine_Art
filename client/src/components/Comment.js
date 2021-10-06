import { useState, useEffect} from "react";

function Comment({ post }) {
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState([]);
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch("/comments")
            .then(resp => resp.json())
            .then(data => 
                setComments(data)
            )
    }, [post])

    const useComment = []
    const newComment = comments.map(ele => {
        if (ele.post_id === post.id){
            return ele
        }
    })
    newComment.forEach(ele => ele ? useComment.push(ele) : null )
    
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
                console.log(data);
                if (data.errors) {
                    setErrors(data.errors)
                } else {
                    setComments(prev => ([data, ...prev]))
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
            {comments ? (
                <ul>{useComment.map(comment => <li key={comment.id} className="lead">{comment.body}</li>)}</ul>)
                : null}
        </div>
    );
}

export default Comment;
