import { createSlice } from '@reduxjs/toolkit';

const searchTicketsSlice = createSlice({
  name: 'searchTickets',
  initialState: {
    initiated: false,
    wasSearched: false,
  },
  reducers: {
    initiateSearch(state) {
      state.initiated = true;
    },
    setWasSearched(state) {
      state.wasSearched = true;
    },
    resetSearch(state) {
      state.initiated = false;
      state.wasSearched = false;  
    },
  },
});

export const { initiateSearch, setWasSearched, resetSearch } = searchTicketsSlice.actions;
export default searchTicketsSlice.reducer;
