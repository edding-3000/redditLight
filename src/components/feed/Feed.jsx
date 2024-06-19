import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRedditPosts, fetchPosts } from "../../features/reddit/redditSlice";
import Post from "../post/Post";
import "./feed.css";

function Feed(props) {
    const posts = useSelector(selectRedditPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(""));
    }, [dispatch]);

    return (
        <div className="feed">
            {posts.map((post, index) => (
                <Post
                    key={index}
                    post={post}
                />
            ))}
        </div>
    )
}

export default Feed;