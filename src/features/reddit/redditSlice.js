import { createSlice } from "@reduxjs/toolkit";

export const redditSlice = createSlice({
    name: "reddit",
    initialState: {
        isLoading: false,
        error: false,
        posts: [],
        rateLimmitValue: 0,
    },
    reducers: {
        loadingRedditPosts: (state) => {
            state.isLoading = true;
        },
        errorLoadingRedditPosts: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        getRedditPosts: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.posts = action.payload;
        }
    }
});

export const { loadingRedditPosts, errorLoadingRedditPosts, getRedditPosts } = redditSlice.actions;
export default redditSlice.reducer;
export const selectRedditPosts = (state) => { state.reddit.posts };