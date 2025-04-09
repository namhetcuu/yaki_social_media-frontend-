import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk"; // Sử dụng destructuring để import
import { authReducer } from "./Auth/auth.reducer";
import postReducer from "./Post/post.reducer";

import  messageReducer  from "./Message/message.reducer";
import { userReducer } from "./Users/user.reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    posts: postReducer,
    users: userReducer,
    message: messageReducer
});

// Tạo store với middleware
const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

export default store;
