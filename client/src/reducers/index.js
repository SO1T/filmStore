import { combineReducers } from 'redux';
import filmReducer from './filmReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    film: filmReducer,
    auth: authReducer,
    error: errorReducer
});