import { combineReducers } from 'redux';
import  loginReducer from './Slices/loginSlice';
import variableReducer from './Slices/variableSlice';
import  clientMasterReducer  from './Slices/clientMasterSlice';
import templateTypeMasterReducer from './Slices/templateTypeMasterSlice';
import templateMasterReducer from './Slices/templateMasterSlice';
const reducers = combineReducers({
    loginReducer:loginReducer,
    variableReducer:variableReducer,
    clientMasterReducer:clientMasterReducer,
    templateTypeMasterReducer:templateTypeMasterReducer,
    templateMasterReducer:templateMasterReducer,

});

export default reducers;