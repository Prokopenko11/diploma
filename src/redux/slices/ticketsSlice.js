import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRoutes } from '../../api/getRoutes';
import { setLoadingProgress, resetLoadingProgress } from './loadingSlice';
import { getMinMaxPrices } from '../../api/getMinMaxPrices';
import { setPriceRange } from './filterSlice';
import { setWasSearched } from './searchTicketsSlice';

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { getState, dispatch }) => {
    const { filters, searchTickets } = getState();

    try {
      dispatch(setLoadingProgress(10));

      const data = await getRoutes({
        fromCity: filters.from,
        toCity: filters.to,
        departureDate: filters.departureDate,
        returnDate: filters.returnDate,
        filters: filters.filters,
        limit: 20,
      });

      console.log(data)

      dispatch(setLoadingProgress(70));

      if (data.items?.length) {
        const { min, max } = getMinMaxPrices(data.items);

        if (!searchTickets.wasSearched) {
          dispatch(setPriceRange({ min, max }));
        }
      }

      dispatch(setWasSearched());

      dispatch(setLoadingProgress(100));

      setTimeout(() => {
        dispatch(resetLoadingProgress());
      }, 300);

      return data;
    } catch (error) {
      dispatch(resetLoadingProgress());
      console.error('Ошибка при загрузке билетов:', error);
      return { total_count: 0, items: [] };
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearTickets(state) {
      state.items = [];
      state.total = 0;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total_count;
        state.loading = false;
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
