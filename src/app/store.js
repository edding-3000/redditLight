import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import redditReducer from "../features/reddit/redditSlice";
import subRedditReducer from "../features/reddit/subRedditSlice";

export default configureStore({
    reducer: combineReducers({
        counter: counterReducer,
        reddit: redditReducer,
        subReddits: subRedditReducer,
    }),
})