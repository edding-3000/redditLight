import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

/**
 * made by scripton [https://www.npmjs.com/~scripton]
 * download "react-reddit-video" here:
 * https://www.npmjs.com/package/react-reddit-video?activeTab=readme
 * 
 * Code modified so that "RedditVideo" can use "appendContainer" props to insert the videoplayer into a specified container.
 * Inserted funktionality to play videos when they are visible in the viewport and stop them otherwise.
 *  
 * RedditVideo component displays a video using the Video.js player.
 *
 * @param {string} HLSurl - The HLS URL of the video.
 * @param {string} width - The width of the video container (default: "30rem").
 * @param {string} height - The height of the video container (default: "30rem").
 * @returns {null} - This component doesn't render any JSX elements directly.
 */
function RedditVideo({ HLSurl, appendContainer = "document.body", width = "30rem", height = "30rem", playWhenIntersecting = "false", threshold = "0.5" }) {
    // Validate HLSurl
    if (typeof HLSurl !== "string" || HLSurl.trim() === "") {
        console.error("Please specify a non-empty HLSurl parameter for your RedditVideo");
        return null;
    }

    // Use a ref to store the container element
    const containerRef = useRef(null);
    const videoPlayerRef = useRef(null);

    useEffect(() => {
        if (appendContainer) {
            // Create a container element
            const container = document.createElement("div");
            container.className = "video-container video-js"; // Add a CSS class for styling

            // Set the width and height
            container.style.width = width;
            container.style.height = height;

            // Store the container element in the ref
            containerRef.current = container;

            // Append the container to the appendContainer element
            appendContainer.appendChild(container);

            // Call the video player initialization function with the container element
            videoPlayerRef.current = RedditVideoPlayer(HLSurl, container);

            // Cleanup: Remove the container when the component unmounts
            return () => {
                if (containerRef.current) {
                    containerRef.current.remove();
                }
                if (videoPlayerRef.current) {
                    videoPlayerRef.current.dispose();
                }
            };
        }
    }, [HLSurl, appendContainer, width, height]);

    useEffect(() => {
        if (containerRef.current && playWhenIntersecting == "true") {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            videoPlayerRef.current.play();
                        } else {
                            videoPlayerRef.current.pause();
                        }
                    });
                },
                { threshold: threshold }
            );

            observer.observe(containerRef.current);

            // Cleanup observer on unmount
            return () => {
                observer.disconnect();
            };
        }
    }, [playWhenIntersecting]);

    return null;
}

/**
 * Initializes the Video.js player with the provided HLS URL and container.
 *
 * @param {string} HLSurl - The HLS URL of the video.
 * @param {HTMLElement} container - The container element for the video player.
 */
function RedditVideoPlayer(HLSurl, container) {
    // Create a video element
    const videoElement = document.createElement("video");
    container.appendChild(videoElement);

    // Initialize the Video.js player
    const options = {
        fill: true,
        fluid: true,
        muted: true,
        loop: true,
        autoplay: false,
        playsinline: true,
        controls: true,
        preload: "metadata",
        sources: [
            {
                src: HLSurl,
                type: "application/x-mpegURL",
            },
        ],
    };

    return videojs(videoElement, options);
}

export default RedditVideo;
