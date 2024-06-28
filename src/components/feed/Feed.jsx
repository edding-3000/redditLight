import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRedditPosts, fetchPosts, getRemainingTimeRateLimit, fetchSearchQuery } from "../../features/reddit/redditSlice";
import Post from "../post/Post";
import "./feed.css";
import Countdown from "../../utilitys/Countdown";
import Reddit from "../../redditAPI/reddit";
import StatusBar from "../statusBar/StatusBar";
import PostSkeleton from "../post/postSkeleton/PostSkeleton";

function Feed(props) {
    const posts = useSelector(selectRedditPosts);
    const { isLoading, error, rateLimit, selectedSubreddit, remainingTimeRateLimit, searchQuery } = useSelector(state => state.reddit);
    const dispatch = useDispatch();

    const [commentId, setCommentId] = useState("");

    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
        dispatch(getRemainingTimeRateLimit());
        console.log("Loading feed...");
    }, [dispatch, selectedSubreddit]);

    if (isLoading) {
        return (
            <div style={{ width: "-webkit-fill-available", maxWidth: "800px", position: "relative", top: "var(--headerHeight)" }}>
                <PostSkeleton num={3} />
            </div>
        )
    }

    if (error) {
        return (
            <div className="feed">
                <h2>Error</h2>
            </div>
        )
    }

    return (
        <div className="feed">
            {/* {rateLimit ? <StatusBar type="error" message={`Ratelimit reached. New Limit in`}><Countdown duration={Reddit.rateLimitTime} /></StatusBar> : ""} */}
            <StatusBar type="error" statusClass={rateLimit} message={`Ratelimit reached. New limit in`}>
                <Countdown duration={remainingTimeRateLimit} />
            </StatusBar>
            {posts.map((post, index) => (
                <Post
                    key={index}
                    post={post}
                    commentId={commentId}
                    setCommentId={setCommentId}
                />
            ))}
        </div>
    )
}

export default Feed;