import { minidenticon } from "minidenticons";
import timeAgo from "../../utilitys/timeAgo";
import CommentList from "./CommentList";
import { useState } from "react";
import MarkdownView from "react-showdown";

const Comment = ({ comment }) => {
    if (comment.body) {
        const img = 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(comment.author, 90));

        const [showReplies, setShowReplies] = useState(false);

        const toggleReplies = () => {
            setShowReplies(!showReplies);
        };

        return (
            <div className={`commentBody`} id={comment.id} data-commentid={comment.id}>
                <span>
                    <span className="creditBar" style={{ "--profileImg": `url("${img}")` }}><p><a href={`https://www.reddit.com/user/${comment.author}`}>{comment.author}</a> • {timeAgo(comment.created)}</p></span>
                    <span style={{ marginLeft: "12px" }}>{<MarkdownView markdown={comment.body} options={{ emoji: true, headerLevelStart: 4, simplifiedAutoLink: true }} />}</span>
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <span className="commentVotes"><button>↑</button><p>{comment.score}</p><button>↓</button></span>
                    </span>
                </span>
                {comment.replies && comment.replies.data && comment.replies.data.children.length > 1 && (
                    <>
                        <Comment comment={comment.replies.data.children[0].data} />

                        {showReplies && comment.replies.data.children.slice(1).map((child, index) => (
                            <Comment key={index} comment={child.data} />
                        ))}
                        {comment.replies.data.children.length > 2 && (
                            <button onClick={toggleReplies}>
                                {showReplies ? '⊖' : '⊕'}
                            </button>
                        )}
                    </>
                )}
            </div>
        );
    }
};

export default Comment;