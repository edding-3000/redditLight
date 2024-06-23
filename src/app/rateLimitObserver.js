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

    // useEffect(() => {
    //     let rateTimer;
    //     if (Reddit.rateLimitTime > 0) {
    //         rateTimer = setTimeout(() => {
    //             resetRateLimitSorage();
    //         }, Reddit.rateLimitTime);
    //     }

    //     return () => {
    //         clearTimeout(rateTimer);
    //     };
    // }, []);

    useEffect(() => {
        let rateTimer;
        if (Reddit.numOfFetches > 0 && Reddit.rateLimitTime) {
            console.log("countling...")
            rateTimer = setTimeout(() => {
                resetRateLimitSorage();
            }, Reddit.rateLimitTime);
        }

        return () => {
            clearTimeout(rateTimer);
        };
    }, [Reddit.numOfFetches]);
};

export default useRateLimitReset;