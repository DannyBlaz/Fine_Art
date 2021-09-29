
function Comment({ comments }) {
    let count = 1
    return (
        <div className="comment">
            <h3>Comments</h3>
            {comments ? (
                <ul>{comments.map(comment => <li key={count}>{comment.body}</li>) }</ul>)
            : null}
        </div>
    );
}

export default Comment;