import timeAgo from "../../utilitys/timeAgo";

export default function Post(props) {
    const { iconUrl, author, subReddit, titleText, postHint, selfText, is_video, videoUrl, imgUrl, postUrl, upVotes, comments, created } = props;

    const profilePic = iconUrl.length === 0 // If no image is set avaliable ...
        ? { 'data-letter': subReddit[2] } // ... render letter in profile pic
        : { style: { "--profileImg": `url(${iconUrl})` } } // else render pic

    return (
        <>
            <span className="credit-bar">
                <span {...profilePic}>
                    {iconUrl ? <img src={iconUrl} alt={`Icon of subreddit ${subReddit}`} /> : subReddit[2]}
                    <p>{subReddit}</p>
                    <p>by {author}</p>
                    <p>{timeAgo(created)}</p>
                </span>
                <span>
                    <h2>{titleText}</h2>
                </span>
                <span>
                    {selfText ? <p>{selfText}</p> : ""}
                    {imgUrl ? <img src={imgUrl} /> : ""}
                    {is_video ? <video src={videoUrl} /> : ""}
                </span>
            </span>
        </>
    )
}