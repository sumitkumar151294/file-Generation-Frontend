import { combineReducers } from 'redux';
import  loginReducer from './Slices/LoginSlice';
const reducers = combineReducers({
    loginReducer:loginReducer,

});

export default reducers;