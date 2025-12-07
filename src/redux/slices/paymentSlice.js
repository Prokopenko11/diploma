import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    type: "",
    onlineType: ""
  },
  reducers: {
    setPaymentType: (state, action) => {
      state.type = action.payload;
      if (action.payload !== "online") {
        state.onlineType = "";
      }
    },
    setOnlineType: (state, action) => {
      state.onlineType = action.payload;
    }
  }
});

export const { setPaymentType, setOnlineType } = paymentSlice.actions;
export default paymentSlice.reducer;
