import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingProgress: 0,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingProgress(state, action) {
      state.loadingProgress = action.payload;
    },
    resetLoadingProgress(state) {
      state.loadingProgress = 0;
    },
  },
});

export const { setLoadingProgress, resetLoadingProgress } = loadingSlice.actions;
export default loadingSlice.reducer;
