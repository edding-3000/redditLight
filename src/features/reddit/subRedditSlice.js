import { createSlice } from "@reduxjs/toolkit";
import Reddit from "../../redditAPI/reddit";

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

export const fetchSubreddits = () => async (dispatch, getState) => {
    try {
        dispatch(loadSubReddits());
        const subReddits = await Reddit.getSubReddits();
        dispatch(getSubReddits(subReddits));
    }
    catch (e) {
        console.log(e);
        dispatch(errorLoadingSubReddit(e));
    }
}