import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk"; // Sử dụng destructuring để import
import { authReducer } from "./Auth/auth.reducer";

const rootReducers = combineReducers({
    auth: authReducer
});

// Tạo store với middleware
const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

export default store;
