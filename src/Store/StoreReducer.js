import { combineReducers } from 'redux';
import  loginReducer from './Slices/LoginSlice';
import fileTypeReducer  from './Slices/fileTypeSlice';
import variableReducer from './Slices/variableSlice';
import  clientMasterReducer  from './Slices/clientMasterSlice';
import templateTypeMasterReducer from './Slices/templateTypeMasterSlice';
import templateMasterReducer from './Slices/templateMasterSlice';

import loginAuthReducer from "../Store/Slices/authSlice"

import templateVariableMasterReducer from './Slices/templateVariableMasterSlice';
import  documentVaultReducer from './Slices/documentVaultSlice';

const reducers = combineReducers({
    loginReducer:loginReducer,
    fileTypeReducer:fileTypeReducer,
    variableReducer:variableReducer,
    clientMasterReducer:clientMasterReducer,
    templateTypeMasterReducer:templateTypeMasterReducer,
    templateMasterReducer:templateMasterReducer,
    loginAuthReducer:loginAuthReducer,
    templateVariableMasterReducer:templateVariableMasterReducer,
    documentVaultReducer:documentVaultReducer


});

export default reducers;