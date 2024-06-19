import timeAgo from "../../utilitys/timeAgo";
import "./post.css";
import RedditVideo from "../../utilitys/react-reddit-video";
import { useEffect, useRef } from "react";

export default function Post(props) {
    const { post } = props;

    const iconUrl = post.sr_detail ? post.sr_detail.icon_img : "";
    const subReddit = post.subreddit_name_prefixed;
    const author = post.author;

    const titleText = post.title;
    const postHint = post.post_hint;
    const link = post.post_hint == "link" ? post.url : "";
    const selfText = post.selftext ? post.selftext : "";
    const is_video = post.is_video;
    const videoUrl = post.is_video ? post.media.reddit_video.fallback_url : "";
    const imgUrl = post.post_hint == "image" ? post.preview ? post.url : "" : "";

    const upVotes = post.ups;
    const comments = post.num_comments;
    const postUrl = post.url;
    const created = post.created;

    const profilePic = iconUrl.length === 0 // If no image is set avaliable ...
        ? { 'data-letter': subReddit[2] } // ... render letter in profile pic
        : { style: { "--profileImg": `url(${iconUrl})` } } // else render pic

    const containerElement = useRef(null);
    // const videoElement = useRef(null);

    return (
        <>
            <span className="postContainer">
                <span className="creditBar" {...profilePic}>
                    <p><a href={`https://www.reddit.com/${subReddit}`} target="_blank">{subReddit}</a> · <a href={`https://www.reddit.com/user/${author}`} target="_blank">{author}</a> · {timeAgo(created)}</p>
                </span>
                <span>
                    <h2>{titleText}</h2>
                </span>
                <span ref={containerElement} className="mediaContainer textWrapPretty" style={imgUrl ? { "--bgSrc": `url(${imgUrl})` } : {}}>
                    {selfText ? <p>{selfText}</p> : ""}
                    {link ? <a href={link} target="_blank" rel="noopener noreferrer">{link}</a> : ""}{/*link*/}
                    {imgUrl ? <img src={imgUrl} loading="lazy" /> : ""} {/*image*/}
                    {/* {is_video ? <video controls loop autoplay="autoplay"><source src={videoUrl} /></video> : ""} hosted:video */}
                    {is_video
                        ? containerElement.current && (
                            <RedditVideo
                                HLSurl={props.post.media.reddit_video.hls_url}
                                appendContainer={containerElement.current}
                                width="100%"
                                height="90vh"
                                playWhenIntersecting="true"
                                threshold="0.3"
                            />
                        )
                        : ""} {/*hosted:video*/}
                </span>
                <span>
                    {/* Buttons for Comments and up/downvotes */}
                </span>
            </span>
        </>
    )
}