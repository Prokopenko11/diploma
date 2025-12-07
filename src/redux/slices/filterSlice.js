import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  from: '',
  to: '',
  departureDate: null,
  returnDate: null,
  filters: {
    haveFirstClass: false,
    haveSecondClass: false,
    haveThirdClass: false,
    haveFourthClass: false,
    haveWifi: false,
    haveAirConditioning: false,
    haveExpress: false,
    priceFrom: 0,
    priceTo: 10000,
    time: {
      departure: { from: 0, to: 1440 },
      arrival: { from: 0, to: 1440 },
      returnDeparture: { from: 0, to: 1440 },
      returnArrival: { from: 0, to: 1440 },
    },
  },
  availablePriceRange: {
    min: 0,
    max: 10000,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFrom(state, action) {
      state.from = action.payload;
    },
    setTo(state, action) {
      state.to = action.payload;
    },
    setDepartureDate(state, action) {
      state.departureDate = action.payload;
    },
    setReturnDate(state, action) {
      state.returnDate = action.payload;
    },
    updateFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    setPriceRange(state, action) {
      const { min, max } = action.payload;

      state.availablePriceRange.min = min;
      state.availablePriceRange.max = max;

      if (state.filters.priceFrom == null) {
        state.filters.priceFrom = min;
      }
      if (state.filters.priceTo == null) {
        state.filters.priceTo = max;
      }
    },
    resetPriceRange(state) {
      state.availablePriceRange = { min: null, max: null };
      state.filters.priceFrom = null;
      state.filters.priceTo = null;
    },
    updateTimeFilter(state, action) {
      const { key, value } = action.payload;
      state.filters.time[key] = value;
    },
    resetTime(state) {
      state.filters.time = {
        departure: { from: 0, to: 1440 },
        arrival: { from: 0, to: 1440 },
        returnDeparture: { from: 0, to: 1440 },
        returnArrival: { from: 0, to: 1440 },
      };
    },
  },
  resetFilters(state) {
    state.filters = { ...initialState.filters };
  },
});

export const {
  setFrom,
  setTo,
  setDepartureDate,
  setReturnDate,
  updateFilter,
  setPriceRange,
  resetPriceRange,
  updateTimeFilter,
  resetTime,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
