import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import taskReducer from "./TaskReducer";
import authReducer from './AuthReducer'

const rootReducer = combineReducers({
    userReducer,
    authReducer,
    taskReducer
});

export default rootReducer;