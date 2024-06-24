import { createSlice } from "@reduxjs/toolkit";
import Reddit from "../../redditAPI/reddit";
import { increasRateLimit, reachedRateLimit } from "./redditSlice";

export const subRedditSlice = createSlice({
    name: "subReddits",
    initialState: {
        isLoading: false,
        error: false,
        errorMessage: "",
        subReddits: [],
    },
    reducers: {
        loadSubReddits: (state) => {
            state.isLoading = true;
            state.errorMessage = "";
        },
        errorLoadingSubReddit: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = action.payload;
        },
        getSubReddits: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.errorMessage = "";
            state.subReddits = action.payload;
        }
    }
});

export const { loadSubReddits, errorLoadingSubReddit, getSubReddits } = subRedditSlice.actions;
export default subRedditSlice.reducer;
export const selectSubreddits = (state) => state.subReddits.subReddits;
export const subRedditsLoading = (state) => state.subReddits.isLoading;
export const subRedditError = (state) => state.subReddits.error;
export const subRedditErrorMessage = (state) => state.subReddits.errorMessage;

export const fetchSubreddits = () => async (dispatch, getState) => {
    const state = getState();
    if (state.reddit.rateLimitNum >= 10) {
        dispatch(reachedRateLimit());
        if (state.reddit.subReddits && state.reddit.subReddits.length > 0) {
            return state.reddit.subReddits;
        }
    }

    try {
        dispatch(loadSubReddits());
        const subReddits = await Reddit.getSubReddits();
        dispatch(getSubReddits(subReddits));
        dispatch(increasRateLimit());
    }
    catch (e) {
        console.log(e);
        dispatch(errorLoadingSubReddit(e));
    }
}