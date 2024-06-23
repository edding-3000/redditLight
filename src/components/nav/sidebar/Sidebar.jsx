import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits, selectSubreddits } from "../../../features/reddit/subRedditSlice";
import { useEffect } from "react";
import "./sidebar.css";
import { setSelectedSubreddit } from "../../../features/reddit/redditSlice";

export default function SideBar({ menueOpen }) {
    const dispatch = useDispatch();

    const subreddits = useSelector(selectSubreddits);
    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    return (
        <aside className={menueOpen ? "open" : ""}>
            <nav>
                <ul>
                    {console.log(subreddits)}
                    {subreddits.map((subreddit, index) => (
                        <li
                            key={index}
                            {...subreddit.icon_img.length === 0 ? { 'data-letter': subreddit.title[0] } : { style: { "--profileImg": `url(${subreddit.icon_img})` } }}
                        >
                            <button type="button">
                                {/* onClick={() => dispatch(setSelectedSubreddit(subreddit.url))} */}
                                {subreddit.display_name_prefixed}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>)
}