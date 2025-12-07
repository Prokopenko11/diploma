import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  departure: null,
  arrival: null,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoutes(state, action) {
      state.departure = action.payload.departure;
      state.arrival = action.payload.arrival;
    }
  }
});

export const { setRoutes } = routeSlice.actions;
export default routeSlice.reducer;
