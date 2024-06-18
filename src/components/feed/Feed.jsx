import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRedditPosts, fetchPosts } from "../../features/reddit/redditSlice";
import Post from "../post/Post";

function Feed(props) {
    const currentState = useSelector(selectRedditPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(""));
    }, [dispatch]);

    return (
        <>
            {currentState.map((value, index) => (
                <Post
                    key={index}
                    iconUrl={value.sr_detail ? value.sr_detail.icon_img : ""}
                    subReddit={value.subreddit_name_prefixed}
                    author={value.author}

                    titleText={value.title}
                    postHint={value.post_hint}
                    selfText={value.selftext ? value.selftext : ""}
                    is_video={value.is_video}
                    videoUrl={value.is_video ? value.media.reddit_video.hls_url : value.preview ? value.url : ""}
                    imgUrl={value.is_video ? "" : value.preview ? value.url : ""}

                    upVotes={value.ups}
                    comments={value.num_comments}
                    postUrl={value.url}
                    created={value.created}
                />
            ))}
        </>
    )
}

export default Feed;