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

        loadComments: false,
        errorComments: false,
        comments: []
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
        getRedditPosts: (state, action) => {
            state.rateLimit = false;
            state.isLoading = false;
            state.error = false;
            console.log(action.payload);
            state.posts = action.payload;
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
        },

        loadComments: (state) => {
            state.loadComments = true;
            state.errorComments = false;
        },
        errorComments: (state) => {
            state.loadComments = false;
            state.errorComments = true;
        },
        getComments: (state, action) => {
            state.loadComments = false;
            state.errorComments = false;
            state.comments = action.payload;
        },

        cleanupStore: (state) => {
            state.searchQuery = "";
            state.selectedSubreddit = "";
            state.posts = [];
            state.comments = [];
        }
    }
});

export const {
    loadingRedditPosts,
    errorLoadingRedditPosts,
    getRedditPosts,
    increasRateLimit,
    reachedRateLimit,
    resetRateLimit,
    remainingTimeRateLimit,
    getRemainingTimeRateLimit,
    storeSearchQuery,
    setSelectedSubreddit,
    resetSearchAndSubreddit,
    loadComments,
    errorComments,
    getComments,
    cleanupStore
} = redditSlice.actions;

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

export const fetchComments = (permaLink) => async (dispatch, getState) => {
    const state = getState();
    if (state.reddit.rateLimitNum >= 10) {
        dispatch(reachedRateLimit());
    }
    try {
        dispatch(loadComments());
        const comments = await Reddit.getComments(permaLink);
        // console.log("comments", comments);
        dispatch(getComments(comments));
        dispatch(increasRateLimit());
    } catch (e) {
        dispatch(errorComments());
    }
}

export const selectRedditPosts = (state) => state.reddit.posts;