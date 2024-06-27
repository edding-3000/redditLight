import { useState } from "react";
import CommentList from "./CommentList";
import CommentSkeleton from "./commentSkeleton/CommentSkeleton";
import { useSelector } from "react-redux";

const Comments = ({ comments }) => {
    const isLoading = useSelector(state => state.reddit.loadComments);
    const errorLoading = useSelector(state => state.reddit.errorComments);

    const [commentRange, setCommentRange] = useState(0);

    let slicedComments = comments.slice(0, commentRange + 1);

    const loadMore = () => {
        setCommentRange((prev) => prev + 1);
    }
    const loadLess = () => {
        setCommentRange((prev) => Math.max(0, prev - 1));
    }

    console.log(slicedComments);

    if (isLoading) {
        return (
            <CommentSkeleton num={1} />
        )
    }

    return (
        <>
            <CommentList comments={slicedComments} />
            {commentRange < slicedComments.length ? <button onClick={loadMore}>More</button> : ""}
            {commentRange > 0 ? <button onClick={loadLess}>Less</button> : ""}
        </>
    )
}
export default Comments;