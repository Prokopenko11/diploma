import { createSlice } from '@reduxjs/toolkit';

const seatsSlice = createSlice({
  name: 'seats',
  initialState: {
    selectedSeats: [],
  },
  reducers: {
    toggleSeat: (state, action) => {
      const { index, coach_id } = action.payload;

      const exists = state.selectedSeats.some(
        (s) => s.index === index && s.coach_id === coach_id
      );

      if (exists) {
        state.selectedSeats = state.selectedSeats.filter(
          (s) => !(s.index === index && s.coach_id === coach_id)
        );
      } else {
        state.selectedSeats.push(action.payload);
      }
    },
    clearSeats: (state, action) => {
      const direction = action.payload;
      state.selectedSeats = state.selectedSeats.filter(
        (seat) => seat.direction !== direction
      );
    },
  },
});

export const { toggleSeat, clearSeats } = seatsSlice.actions;
export default seatsSlice.reducer;
