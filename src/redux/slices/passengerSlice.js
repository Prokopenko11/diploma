import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forward: { adults: 0, children: 0, infants: 0 },
  backward: { adults: 0, children: 0, infants: 0 },
  data: [],
};

const passengerSlice = createSlice({
  name: 'passengers',
  initialState,
  reducers: {
    setPassengers: (state, action) => {
      const { direction, type, value } = action.payload;
      state[direction][type] = value;
    },

    initializePassengers: (state, action) => {
      const count = action.payload;
      const newData = Array.from({ length: count }, (_, i) => {
        return state.data[i] ? { ...state.data[i] } : {};
      });

      state.data = newData;
    },

    updatePassengerData: (state, action) => {
      const { index, data } = action.payload;

      if (!state.data[index]) {
        state.data[index] = {};
      }

      state.data[index] = {
        ...state.data[index],
        ...data,
      };
    },

    clearPassengerField: (state, action) => {
      const { index, field } = action.payload;
      if (state.data?.[index]) {
        delete state.data[index][field];
      }
    },

    resetPassengers: () => initialState,
  },
});

export const {
  setPassengers,
  resetPassengers,
  updatePassengerData,
  clearPassengerField,
  initializePassengers
} = passengerSlice.actions;

export default passengerSlice.reducer;
