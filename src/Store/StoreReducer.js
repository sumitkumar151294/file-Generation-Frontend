import { combineReducers } from 'redux';
import  loginReducer from './Slices/loginSlice';
import variableReducer from './Slices/variableSlice';
import  clientMasterReducer  from './Slices/clientMasterSlice';
const reducers = combineReducers({
    loginReducer:loginReducer,
    variableReducer:variableReducer,
    clientMasterReducer:clientMasterReducer

});

export default reducers;