import { createSlice } from "@reduxjs/toolkit";

export const subRedditSlice = createSlice({
    name: "subReddits",
    initialState: {
        isLoading: false,
        error: false,
        subReddits: [],
    },
    reducers: {
        loadSubReddits: (state) => {
            state.isLoading = true;
        },
        errorLoadingSubReddit: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        getSubReddit: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.subReddits = action.payload;
        }
    }
});

export const { loadSubReddits, errorLoadingSubReddit, getSubReddit } = subRedditSlice.actions;
export default subRedditSlice.reducer;
export const selectSubreddits = (state) => state.subReddits.subReddits;

