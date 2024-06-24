import { useEffect, useState } from "react";
import "./statusBar.css";

/**
 * StatusBar Component
 * @param {string} type - "error" or "success"
 * @param {string} message - Message to display inside StatusBar
 * @param {boolean} statusClass - When true shows StatusBar, when false hides it
 * @returns StatusBar element
 */
export default function StatusBar({ type, message, statusClass, children }) {
    const [showStatusBar, setShowStatusBar] = useState(false);

    useEffect(() => {
        console.log("statusClass", statusClass);
        if (statusClass) {
            setShowStatusBar(true);
        } else {
            const timeout = setTimeout(() => {
                setShowStatusBar(false);
            }, 250);
            return () => clearTimeout(timeout);
        }
    }, [statusClass]);

    return (
        showStatusBar && (
            <div className={`message ${type} ${statusClass ? "fadeIn" : ""}`}>
                <span className="statusBarContent">
                    <button onClick={() => setShowStatusBar(false)}>X</button>
                    <span>{message} {children}</span>
                </span>
            </div>
        )
    );
}
