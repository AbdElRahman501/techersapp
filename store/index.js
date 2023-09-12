import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';
import languageReducer from './reducers/languageReducer';
import { signInReducer, userReducer } from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';


const initialState = {
    counter: { count: 0 }
}


const store = configureStore({
    reducer: {
        counter: counterReducer,
        languageState: languageReducer,
        messageState: messageReducer,
        userInfo: userReducer,
        userSignIn: signInReducer,
    },
    preloadedState: initialState,
    devTools: false,
}, applyMiddleware(thunk))
export default store;
