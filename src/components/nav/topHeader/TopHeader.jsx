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
                    <button id="menue" onClick={toggleMenue}>Menu</button>
                </span>
                <span className={`headerRight ${menueOpen ? "open" : ""}`}>
                    <h1><button onClick={mainButtonClick}>redditLight</button></h1>
                    <form onSubmit={handleSubmit}>
                        <button type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M782-82 523-341q-29 20-67.5 32T372-297q-118 0-200.5-82.5T89-580q0-118 82.5-200.5T372-863q118 0 200.5 82.5T655-580q0 46-12 83.5T611-431l260 261-89 88ZM372-423q66 0 111.5-45.5T529-580q0-66-45.5-111.5T372-737q-66 0-111.5 45.5T215-580q0 66 45.5 111.5T372-423Z" /></svg>
                        </button>
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