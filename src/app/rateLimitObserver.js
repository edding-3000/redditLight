import Reddit from "../redditAPI/reddit";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetRateLimit } from "../features/reddit/redditSlice";

const useRateLimitReset = () => {
    const dispatch = useDispatch();

    const resetRateLimitSorage = () => {
        console.log("New Limit");
        localStorage.removeItem("rateLimitSet");
        localStorage.removeItem("rateLimitTime");
        localStorage.removeItem("numOfFetches");
        dispatch(resetRateLimit());
    }

    useEffect(() => {
        let rateTimer;
        if (Reddit.rateLimitTime > 0) {
            rateTimer = setTimeout(() => {
                resetRateLimitSorage();
            }, Reddit.rateLimitTime);
        } else {
            resetRateLimitSorage();
            clearTimeout(rateTimer);
        }

        return () => {
            clearTimeout(rateTimer);
        };
    }, []);
};

export default useRateLimitReset;