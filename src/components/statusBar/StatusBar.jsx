import { useEffect, useRef, useState } from "react";
import "./statusBar.css";

export default function StatusBar(props) {
    const { message, type, statusClass, children } = props;

    const [toggleVisibility, setToggleVisibility] = useState(false);
    const hideStatusBar = useRef(null);

    function handleClick() {
        setToggleVisibility(true);
    }

    useEffect(() => {
        setToggleVisibility(false);
    }, [statusClass])

    return (
        <div ref={hideStatusBar} className={`message ${type} ${toggleVisibility ? "" : statusClass ? "fadeIn" : ""}`}><span className="statusBarContent"><button onClick={handleClick}>X</button><span>{message} {children}</span></span></div>
    )
}