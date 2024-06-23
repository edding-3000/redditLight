import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { storeSearchQuery } from "../../../features/reddit/redditSlice";
import "./topHeader.css";

export default function TopNav({ toggleMenue }) {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();

    function searchChange({ target }) {
        setSearchQuery(target.value);
        console.log(searchQuery);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("submited", searchQuery);
        if (searchQuery.length > 0) {
            dispatch(storeSearchQuery(searchQuery));
        }
    }

    const [height, setHeight] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setHeight(ref.current.clientHeight);
        if (height > 0) document.documentElement.style.setProperty("--headerHeight", height + "px");
    });

    return (
        <header ref={ref}>
            <div>
                <button onClick={toggleMenue}>Menu</button>
                <h1>redditLight</h1>
                <form onSubmit={handleSubmit}>
                    <input type="submit" />
                    <input placeholder="Search" onChange={searchChange} value={searchQuery} type="text" />
                </form>
            </div>
        </header>
    )
}