import { createSlice } from "@reduxjs/toolkit";

const selectedTicketSlice = createSlice({
  name: "selectedTicket",
  initialState: {
    departure: null,
    arrival: null,
  },
  reducers: {
    setSelectedTicket(state, action) {
      state.departure = action.payload.departure;
      state.arrival = action.payload.arrival;
    },
    clearSelectedTicket(state) {
      state.departure = null;
      state.arrival = null;
    }
  }
});

export const { setSelectedTicket, clearSelectedTicket } =
  selectedTicketSlice.actions;

export default selectedTicketSlice.reducer;
