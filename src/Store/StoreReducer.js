import { combineReducers } from 'redux';
import  loginReducer from './Slices/loginSlice';
import variableReducer from './Slices/variableSlice';
const reducers = combineReducers({
    loginReducer:loginReducer,
    variableReducer:variableReducer

});

export default reducers;