import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

export const initialCount: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCount,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;