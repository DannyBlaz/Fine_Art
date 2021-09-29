
function Comment({ comments }) {
    return (
        <div className="comment">
            <h3>Comments</h3>
            {comments ? (
                <ul>{comments.map(comment => <li key={comment.id}>{comment.body}</li>) }</ul>)
            : null}
        </div>
    );
}

export default Comment;