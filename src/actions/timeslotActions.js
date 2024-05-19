import axios from 'axios';

export const fetchTimeslots = () => async (dispatch) => {
  dispatch({ type: 'FETCH_TIMESLOTS_REQUEST' });
  try {
    const response = await axios.get(process.env.API_ENDPOINT);
    dispatch({ type: 'FETCH_TIMESLOTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TIMESLOTS_FAILURE', error });
  }
};
