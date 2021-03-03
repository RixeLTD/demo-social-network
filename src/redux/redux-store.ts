import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reduces";
import authReducer from "./auth-reduces";
import appReducer from "./app-reduces";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    me: authReducer,
    app: appReducer,
})

export type InferActionTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store;