import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: parseInt(localStorage.getItem("value"), 10) || 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
            localStorage.setItem("value", state.value);
        },
        decrement: (state) => {
            state.value -= 1
            localStorage.setItem("value", state.value);
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer