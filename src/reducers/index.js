import { combineReducers } from 'redux';
import timeslotReducer from './timeslotReducer';

const rootReducer = combineReducers({
  timeslot: timeslotReducer,
});

export default rootReducer;
