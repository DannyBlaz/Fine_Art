
function Comment({ comments }) {
    return (
        <div className="comment">
            <h3>Comments</h3>
            <ul>{comments.map(comment => comment.body) }</ul>
        </div>
    );
}

export default Comment;