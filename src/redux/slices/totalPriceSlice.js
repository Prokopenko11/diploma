import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forward: { total: 0, adultsTotal: 0, childrenTotal: 0 },
  backward: { total: 0, adultsTotal: 0, childrenTotal: 0 },
};

const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState,
  reducers: {
    setTotalPrice: (state, action) => {
      const { direction, total, adultsTotal, childrenTotal } = action.payload;
      state[direction] = { total, adultsTotal, childrenTotal };
    },
    resetTotalPrice: () => initialState,
  },
});


export const { setTotalPrice, resetTotalPrice } = totalPriceSlice.actions;
export default totalPriceSlice.reducer;
