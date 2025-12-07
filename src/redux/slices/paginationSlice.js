import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 1,
    itemsPerPage: 5,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
});

export const { setCurrentPage, setItemsPerPage } = paginationSlice.actions;
export default paginationSlice.reducer;
