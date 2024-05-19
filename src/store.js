import { configureStore } from '@reduxjs/toolkit';
import timeslotReducer from './reducers/timeslotSlice';

const store = configureStore({
  reducer: {
    timeslot: timeslotReducer,
  },
});

export default store;
