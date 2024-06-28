import timeAgo from "../../utilitys/timeAgo";
import "./post.css";
import RedditVideo from "../../utilitys/react-reddit-video";
import { useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/reddit/redditSlice";
import Comments from "../comments/Comments";
import SelfText from "./selftext/Selftext";

function UrlExists(url) {
    return new Promise((resolve) => {
        let http = new XMLHttpRequest();
        http.open('HEAD', url, true); // true für asynchron
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                resolve(http.status != 404 && http.status != 403);
            }
        };
        http.send();
    });
}

export default function Post({ post, commentId, setCommentId }) {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.reddit.comments);
    const [commentsOpen, setCommentsOpen] = useState(false);

    const id = post.id;

    const iconUrl = post.sr_detail ? post.sr_detail.icon_img : "";
    const subReddit = post.subreddit_name_prefixed;
    const author = post.author;

    const titleText = post.title;
    const postHint = post.post_hint;
    const link = post.post_hint == "link" ? post.url : "";
    const selfText = post.selftext ? post.selftext : "";
    const is_video = post.is_video;
    const videoUrl = post.is_video ? post.media.reddit_video.hls_url : "";
    const imgUrl = post.post_hint == "image" ? post.preview ? post.url : "" : "";

    const upVotes = post.ups;
    const commentsNum = post.num_comments;
    const permaLink = post.permalink;
    const postUrl = post.url;
    const created = post.created;

    const profilePic = iconUrl.length === 0 // If no image is set avaliable ...
        ? { 'data-letter': subReddit[2] } // ... render letter in profile pic
        : { style: { "--profileImg": `url(${iconUrl})` } } // else render pic

    const containerElement = useRef(null);
    const [isContainerReady, setIsContainerReady] = useState(false);

    useEffect(() => {
        if (containerElement.current && !isContainerReady) {
            setIsContainerReady(true);
        }
    });

    const [imgExists, setImgExists] = useState(false);
    const [videoExists, setVideoExists] = useState(false);

    useEffect(() => {
        const checkUrls = async () => {
            const imgCheck = await UrlExists(imgUrl);
            setImgExists(imgCheck);

            if (is_video) {
                const videoCheck = await UrlExists(videoUrl);
                setVideoExists(videoCheck);
                const secondVideoCheck = await UrlExists(post.media.reddit_video.fallback_url);
                setVideoExists(secondVideoCheck);
            }
        };

        checkUrls();
    }, [imgUrl, is_video, videoUrl]);

    if (!imgExists || (is_video && !videoExists)) {
        return null;
    }

    const loadComments = () => {
        if (!commentsOpen) {
            if (commentId !== id) {
                dispatch(fetchComments(permaLink));
            }
            setCommentId(id);
            setCommentsOpen(true);
        } else setCommentsOpen(false);
    }

    return (
        <>
            <span className="postContainer" data-id={id}>
                <span className="creditBar" {...profilePic}>
                    <p><a href={`https://www.reddit.com/${subReddit}`} target="_blank">{subReddit}</a> • <a href={`https://www.reddit.com/user/${author}`} target="_blank">{author}</a> • {timeAgo(created)}</p>
                </span>
                <span>
                    <h2>{titleText}</h2>
                </span>
                <span ref={containerElement} className="mediaContainer textWrapPretty" style={imgUrl ? { "--bgSrc": `url(${imgUrl})` } : {}}>
                    {selfText ? <SelfText text={selfText} /> : ""}
                    {/* <p className="selfText">{selfText}</p> */}
                    {link ? <a href={link} target="_blank" rel="noopener noreferrer">{link}</a> : ""}{/*link*/}
                    {imgUrl ? <img src={imgUrl} loading="lazy" /> : ""} {/*image*/}
                    {/* {is_video ? <video controls loop autoplay="autoplay"><source src={videoUrl} /></video> : ""} hosted:video */}
                    {is_video ? isContainerReady ? (
                        <RedditVideo
                            HLSurl={videoUrl}
                            appendContainer={containerElement.current}
                            width="100%"
                            height="90vh"
                            playWhenIntersecting="true"
                            threshold="0.3"
                        />
                    ) : (
                        <Skeleton height={"90vh"} />
                    ) :
                        ""}
                </span>
                <span className="postInteraction">
                    <span className="postButton">
                        <button>↑</button>
                        {upVotes}
                        <button>↓</button>
                    </span>
                    <span className="postButton">
                        <button onClick={loadComments}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M864-96 720-240H168q-29.7 0-50.85-21.15Q96-282.3 96-312v-480q0-29.7 21.15-50.85Q138.3-864 168-864h624q29.7 0 50.85 21.15Q864-821.7 864-792v696ZM168-312h582l42 42v-522H168v480Zm0 0v-480 480Z" /></svg>
                            {commentsNum}
                        </button>
                    </span>
                </span>
            </span>
            {commentId === id && commentsOpen && <span className="comments">
                <Comments comments={comments} />
            </span>}
        </>
    )
}