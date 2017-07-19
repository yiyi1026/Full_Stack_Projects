import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  // errors:[]
});

export default rootReducer;
