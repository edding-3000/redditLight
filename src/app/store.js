import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import redditReducer from "../features/reddit/redditSlice";
import subRedditReducer from "../features/reddit/subRedditSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state from localStorage:", err);
        return undefined;
    }
};

const persistedState = loadState();

const store = configureStore({
    reducer: combineReducers({
        counter: counterReducer,
        reddit: redditReducer,
        subReddits: subRedditReducer,
    }),
    preloadedState: persistedState,
});

store.subscribe(() => {
    try {
        const serializedState = JSON.stringify(store.getState());
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error("Could not save state to localStorage:", err);
    }
});

export default store;