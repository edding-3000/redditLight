import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits, selectSubreddits, subRedditsLoading } from "../../../features/reddit/subRedditSlice";
import { useEffect, useRef } from "react";
import "./sidebar.css";
import { setSelectedSubreddit } from "../../../features/reddit/redditSlice";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import NavLinkSkeleton from "../navLinkSkeleton/NavLinkSkeleton";

export default function SideBar({ menueOpen }) {
    const dispatch = useDispatch();
    const subRedditLoading = useSelector(subRedditsLoading)

    const subreddits = useSelector(selectSubreddits);
    useEffect(() => {
        dispatch(fetchSubreddits());
        console.log(subreddits)
    }, []);

    // Set width of sidebar as css var
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current.clientWidth > 0) document.documentElement.style.setProperty("--sideBarWidth", ref.current.clientWidth + "px");
    });

    return (
        <aside className={menueOpen ? "open" : ""} ref={ref}>
            <nav>
                <ul>
                    {subreddits && !subRedditLoading ?
                        subreddits.map((subreddit, index) => (
                            <li key={index} >
                                <button type="button"
                                    onClick={() => dispatch(setSelectedSubreddit(subreddit.display_name_prefixed))}
                                >
                                    <span className="subredditIcon" {...subreddit.icon_img ? { style: { "--profileImg": `url(${subreddit.icon_img})` } } : ""} >
                                        {subreddit.icon_img.length === 0 ? subreddit.title[0] : ""}
                                    </span>
                                    <span className="subredditName">{subreddit.display_name_prefixed}</span>
                                </button>
                            </li>
                        ))
                        : <NavLinkSkeleton num={10} />
                    }
                </ul>
            </nav>
        </aside>)
}