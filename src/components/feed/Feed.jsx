import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRedditPosts, fetchPosts } from "../../features/reddit/redditSlice";
import Post from "../post/Post";
import "./feed.css";
import Countdown from "../../utilitys/Countdown";
import Reddit from "../../redditAPI/reddit";
import StatusBar from "../statusBar/StatusBar";

function Feed(props) {
    const posts = useSelector(selectRedditPosts);
    const { isLoading, error, rateLimmit } = useSelector(state => state.reddit);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(""));
    }, [dispatch]);

    const [showStatusBar, setShowStatusBar] = useState(false);

    useEffect(() => {
        if (rateLimmit) {
            setShowStatusBar(true);
        } else {
            const timeout = setTimeout(() => { setShowStatusBar(false); }, 250);
            return () => clearTimeout(timeout);
        }
    }, [rateLimmit]);

    if (isLoading) {
        return (
            <div className="feed">
                <h1>Loading...</h1>
            </div>
        )
    }

    if (error) {
        return (
            <div className="feed">
                <h1>Error</h1>
            </div>
        )
    }

    return (
        <div className="feed">
            {/* {rateLimmit ? <StatusBar type="error" message={`Ratelimit reached. New limmit in`}><Countdown duration={Reddit.rateLimitTime} /></StatusBar> : ""} */}
            {showStatusBar ?
                <StatusBar type="error" statusClass={rateLimmit} message={`Ratelimit reached. New limit in`}>
                    <Countdown duration={Reddit.rateLimitTime} />
                </StatusBar>
                : null}
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