import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  event: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    clearEvent: (state) => {
      state.event = null;
    },
  },
});

export const { setEvent, clearEvent } = eventSlice.actions;
export const selectEvent = (state) => state.event.event;
export default eventSlice.reducer;
