import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchSearchQuery, getRemainingTimeRateLimit, resetSearchAndSubreddit, setSelectedSubreddit, storeSearchQuery } from "../../../features/reddit/redditSlice";
import "./topHeader.css";
import Countdown from "../../../utilitys/Countdown";

export default function TopNav({ toggleMenue, menueOpen }) {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();

    const { rateLimitNum, remainingTimeRateLimit } = useSelector((state) => state.reddit);
    useEffect(() => {
        dispatch(getRemainingTimeRateLimit());
    }, [dispatch, rateLimitNum]);

    function searchChange({ target }) {
        setSearchQuery(target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("submited", searchQuery);
        if (searchQuery.length > 0) {
            dispatch(storeSearchQuery(searchQuery));
            dispatch(fetchSearchQuery(searchQuery));
        }
    }

    // Set height of navigation as css var
    const [height, setHeight] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setHeight(ref.current.clientHeight);
        if (height > 0) document.documentElement.style.setProperty("--headerHeight", height + "px");
    });

    function mainButtonClick() {
        dispatch(resetSearchAndSubreddit());
        dispatch(fetchPosts());
    }
    return (
        <header ref={ref}>
            <div>
                <span className={`headerLeft ${menueOpen ? "open" : ""}`}>
                    <button id="menue" onClick={toggleMenue}>Menu</button>
                </span>
                <span className={`headerRight ${menueOpen ? "open" : ""}`}>
                    <h1><button onClick={mainButtonClick}>redditLight</button></h1>
                    <form onSubmit={handleSubmit}>
                        <input type="submit" />
                        <input placeholder="Search" onChange={searchChange} value={searchQuery} type="text" />
                    </form>
                </span>
                <span style={{ fontVariantNumeric: "tabular-nums lining-nums", color: "var(--midGrey)" }}>
                    <p>{rateLimitNum} • <Countdown duration={remainingTimeRateLimit} /></p>
                </span>
            </div>
        </header>
    )
}