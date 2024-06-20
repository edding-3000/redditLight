import { createSlice } from "@reduxjs/toolkit";
import Reddit from "../../redditAPI/reddit";

export const redditSlice = createSlice({
    name: "reddit",
    initialState: {
        isLoading: false,
        error: false,
        posts: [],
        rateLimmit: false,
        selectedSubreddit: "",
    },
    reducers: {
        loadingRedditPosts: (state) => {
            state.isLoading = true;
            state.rateLimmit = false;
        },
        errorLoadingRedditPosts: (state) => {
            state.isLoading = false;
            state.error = true;
            state.rateLimmit = false;
        },
        reachedRateLimit: (state) => {
            state.isLoading = false;
            state.error = false;
            state.rateLimmit = true;
        },
        resetRateLimit: (state) => {
            state.rateLimmit = false;
        },
        getRedditPosts: (state, action) => {
            state.rateLimmit = false;
            state.isLoading = false;
            state.error = false;
            console.log(action.payload);
            state.posts = action.payload;
        }
    }
});

export const { loadingRedditPosts, errorLoadingRedditPosts, getRedditPosts, reachedRateLimit, resetRateLimit } = redditSlice.actions;
export default redditSlice.reducer;

export const fetchPosts = (subreddit = "") => async (dispatch, getState) => {
    const state = getState();
    if (state.reddit.rateLimmit) return state.reddit.posts;
    try {
        dispatch(loadingRedditPosts());
        const posts = await Reddit.getSubReddit(subreddit);
        posts ? dispatch(getRedditPosts(posts)) : dispatch(reachedRateLimit());
    } catch (e) {
        dispatch(errorLoadingRedditPosts());
    }
}

export const selectRedditPosts = (state) => state.reddit.posts;