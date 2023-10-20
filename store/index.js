import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';
import languageReducer from './reducers/languageReducer';
import { userReducer } from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import { locationReducer } from './reducers/deviceReducers';


const initialState = {
    counter: { count: 0 }
}


const store = configureStore({
    reducer: {
        counter: counterReducer,
        languageState: languageReducer,
        messageState: messageReducer,
        userInfo: userReducer,
        locationState: locationReducer
    },
    preloadedState: initialState,
    devTools: false,
}, applyMiddleware(thunk))
export default store;
