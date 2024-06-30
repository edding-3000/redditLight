import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchSearchQuery, getRemainingTimeRateLimit, resetSearchAndSubreddit, setSelectedSubreddit, storeSearchQuery } from "../../../features/reddit/redditSlice";
import "./topHeader.css";
import Countdown from "../../../utilitys/Countdown";
import useWindowDimensions from "../../../utilitys/hooks/useWindowDimentions";

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

    const [searchOpen, setSearchOpen] = useState(false);
    const { width } = useWindowDimensions();

    function handleSubmit(e) {
        e.preventDefault();
        if (width > 750 && searchQuery.length > 0) {
            dispatch(storeSearchQuery(searchQuery));
            dispatch(fetchSearchQuery(searchQuery));
        } else {
            if (!searchOpen) {
                setSearchOpen(true);
            } else if (searchOpen && searchQuery.length > 0) {
                dispatch(storeSearchQuery(searchQuery));
                dispatch(fetchSearchQuery(searchQuery));
            } else if (searchOpen && searchQuery.length == 0) {
                setSearchOpen(false);
            }
        }
    }

    // Set height of navigation as css var
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current.clientHeight > 0) document.documentElement.style.setProperty("--headerHeight", ref.current.clientHeight + "px");
    });

    function mainButtonClick() {
        dispatch(resetSearchAndSubreddit());
        dispatch(fetchPosts());
    }
    return (
        <header ref={ref}>
            <div>
                <span className={`headerLeft ${menueOpen ? "open" : ""}`}>
                    <button id="menue" aria-label="Menu" onClick={toggleMenue}>
                        <span className="word">Menu</span>
                        <span className="icon">
                            {menueOpen ?
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="m252.62-217.23-35.39-35.39L444.62-480 217.23-707.38l35.39-35.39L480-515.38l227.38-227.39 35.39 35.39L515.38-480l227.39 227.38-35.39 35.39L480-444.62 252.62-217.23Z" /></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M140-254.62v-50.25h680v50.25H140Zm0-200.25v-50.26h680v50.26H140Zm0-200.26v-50.25h680v50.25H140Z" /></svg>
                            }
                        </span>
                    </button>
                </span>
                <span className={`headerRight ${menueOpen ? "open" : ""}`}>
                    <h1 className={`${searchOpen ? "open" : ""}`}><button onClick={mainButtonClick} aria-label="Home">redditLight</button></h1>
                    <form onSubmit={handleSubmit}>
                        <button type="submit" aria-label="Button">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M781.69-136.92 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l251.23 251.23-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" /></svg>
                        </button>
                        <input className={`searchInput ${searchOpen ? "open" : ""}`} placeholder="Search" onChange={searchChange} value={searchQuery} type="text" />
                    </form>
                </span>
                <span style={{ fontVariantNumeric: "tabular-nums lining-nums", color: "var(--midGrey)" }}>
                    <p>{rateLimitNum} • <Countdown duration={remainingTimeRateLimit} /></p>
                </span>
            </div>
        </header>
    )
}