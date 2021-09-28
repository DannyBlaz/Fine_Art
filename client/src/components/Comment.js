
function Comment({ comments }) {
    return (
        <div className="comment">
            <h3>Comments</h3>
            {comments ? (
            <ul>{comments.map(comment => comment.body) }</ul>)
            : null}
        </div>
    );
}

export default Comment;