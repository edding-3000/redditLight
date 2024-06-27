import { useState } from "react";
import Comment from "./Comment";
import "./comment.css";
const CommentList = ({ comments }) => {

    return (
        <div>
            {comments.map((child, index) => (
                <Comment
                    key={index}
                    comment={child.data}
                />
            ))}
        </div>
    );
};
export default CommentList;