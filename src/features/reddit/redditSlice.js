import { createSlice } from "@reduxjs/toolkit";
import Reddit from "../../redditAPI/reddit";

export const redditSlice = createSlice({
    name: "reddit",
    initialState: {
        isLoading: false,
        error: false,
        posts: [],
        rateLimit: false,
        rateLimitNum: 0,
        rateLimitTime: 0,
        remainingTimeRateLimit: false,
        selectedSubreddit: "",
        searchQuery: "",
    },
    reducers: {
        loadingRedditPosts: (state) => {
            state.isLoading = true;
            state.rateLimit = false;
        },
        errorLoadingRedditPosts: (state) => {
            state.isLoading = false;
            state.error = true;
            state.rateLimit = false;
        },
        increasRateLimit: (state) => {
            state.rateLimitNum += 1;
            if (!state.rateLimitTime || state.rateLimitTime == 0) {
                state.rateLimitTime = Date.now();
            }
        },
        reachedRateLimit: (state) => {
            console.log("Reached Reddit's rate limit.");
            state.isLoading = false;
            state.error = false;
            state.rateLimit = true;
        },
        resetRateLimit: (state) => {
            state.rateLimit = false;
            state.rateLimitNum = 0;
            state.rateLimitTime = 0;
            state.remainingTimeRateLimit = false;
            console.log("New limit.");
        },
        getRemainingTimeRateLimit: (state) => {
            state.remainingTimeRateLimit = state.rateLimitTime > 0 ? 60000 - (Date.now() - state.rateLimitTime) : false;
        },
        getRedditPosts: (state, action) => {
            state.rateLimit = false;
            state.isLoading = false;
            state.error = false;
            console.log(action.payload);
            state.posts = action.payload;
        },

        storeSearchQuery: (state, action) => {
            state.selectedSubreddit = "";
            state.searchQuery = action.payload;
        },

        setSelectedSubreddit: (state, action) => {
            state.searchQuery = "";
            state.selectedSubreddit = action.payload;
        },

        resetSearchAndSubreddit: (state) => {
            state.searchQuery = "";
            state.selectedSubreddit = "";
        }
    }
});

export const { loadingRedditPosts, errorLoadingRedditPosts, getRedditPosts, increasRateLimit, reachedRateLimit, resetRateLimit, remainingTimeRateLimit, getRemainingTimeRateLimit, storeSearchQuery, setSelectedSubreddit, resetSearchAndSubreddit } = redditSlice.actions;
export default redditSlice.reducer;

export const fetchPosts = (subreddit = "") => async (dispatch, getState) => {
    const state = getState();
    if (state.reddit.rateLimitNum >= 10) {
        dispatch(reachedRateLimit());
        return state.reddit.posts;
    }
    try {
        dispatch(loadingRedditPosts());
        const posts = await Reddit.getSubReddit(subreddit);
        dispatch(getRedditPosts(posts));
        dispatch(increasRateLimit());
    } catch (e) {
        dispatch(errorLoadingRedditPosts());
    }
}

export const fetchSearchQuery = (searchQuery) => async (dispatch, getState) => {
    const state = getState();
    if (state.reddit.rateLimitNum >= 10) {
        dispatch(reachedRateLimit());
    }
    try {
        dispatch(loadingRedditPosts());
        const posts = await Reddit.searchRequest(searchQuery);
        console.log("posts", posts);
        dispatch(getRedditPosts(posts));
        dispatch(increasRateLimit());
    } catch (e) {
        dispatch(errorLoadingRedditPosts());
    }
}

export const selectRedditPosts = (state) => state.reddit.posts;