import { combineReducers } from 'redux';
import authReducer from './authReducer';
import visitorReducer from './visitorReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    visitors: visitorReducer,
});

export default rootReducer;
