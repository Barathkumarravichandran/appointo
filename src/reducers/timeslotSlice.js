import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTimeslots = createAsyncThunk(
  'timeslot/fetchTimeslots',
  async () => {
    const response = await axios.get('https://app.appointo.me/scripttag/mock_timeslots?start_date=2024-01-20&end_date=2024-01-30');
    return response.data;
  }
);

const timeslotSlice = createSlice({
  name: 'timeslot',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeslots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimeslots.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTimeslots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default timeslotSlice.reducer;
