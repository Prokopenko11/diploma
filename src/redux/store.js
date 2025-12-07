import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filterSlice';
import loadingReducer from './slices/loadingSlice';
import searchTicketsReducer from './slices/searchTicketsSlice';
import ticketsReducer from './slices/ticketsSlice';
import paginationReducer from './slices/paginationSlice';
import passengerReducer from './slices/passengerSlice';
import seatsReducer from './slices/seatsSlice';
import totalPriceReducer from './slices/totalPriceSlice';
import routeSliceReducer from './slices/routeSlice';
import paymentSlicereducer from './slices/paymentSlice';
import selectedTicketReducer from "./slices/selectedTicketSlice";
import { makeStorageKey, loadState, saveState } from './saveLocal';

const persistSlices = {
  filters: {},
  pagination: {},
  passengers: {},
  seats: {},
  totalPrice: {},
  routes: {},
  selectedTicket: {},
  payment: {}
};

const STORAGE_KEY = makeStorageKey(persistSlices);

const preloadedState = loadState(STORAGE_KEY) || undefined;

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    loading: loadingReducer,
    searchTickets: searchTicketsReducer,
    tickets: ticketsReducer,
    selectedTicket: selectedTicketReducer,
    pagination: paginationReducer,
    passengers: passengerReducer,
    seats: seatsReducer,
    totalPrice: totalPriceReducer,
    routes: routeSliceReducer,
    payment: paymentSlicereducer,
  },
  preloadedState,
});

let saveTimeout;
store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const state = store.getState();
    const dataToSave = {};
    for (const sliceName of Object.keys(persistSlices)) {
      dataToSave[sliceName] = state[sliceName];
    }
    saveState(STORAGE_KEY, dataToSave);
  }, 200);
});
