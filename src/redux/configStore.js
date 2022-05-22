import {combineReducers,createStore} from "redux";
import AuthReducer from "./reducers/User/AuthReducer";

const rootReducer = combineReducers({
    AuthReducer: AuthReducer
})

const store = createStore(rootReducer);
export default store;