import Reddit from "../redditAPI/reddit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts, resetRateLimit, getRemainingTimeRateLimit } from "../features/reddit/redditSlice";

const useRateLimitReset = () => {
    const dispatch = useDispatch();
    const { selectedSubreddit, rateLimitNum, remainingTimeRateLimit } = useSelector((store) => store.reddit);

    useEffect(() => {
        dispatch(getRemainingTimeRateLimit());
        let rateTimer;
        if (rateLimitNum > 0 && remainingTimeRateLimit) {
            console.log("countling...")
            rateTimer = setTimeout(() => {
                if (rateLimitNum >= 10) dispatch(fetchPosts(selectedSubreddit));
                dispatch(resetRateLimit());
            }, remainingTimeRateLimit);
        }

        return () => {
            clearTimeout(rateTimer);
        };
    }, [dispatch, rateLimitNum]);
};

export default useRateLimitReset;