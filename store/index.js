import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';
import languageReducer from './reducers/languageReducer';


const initialState = {
    counter: { count: 0 }
}


const store = configureStore({
    reducer: {
        counter: counterReducer,
        languageState: languageReducer
    },
    preloadedState: initialState,
    devTools: false,
}, applyMiddleware(thunk))
export default store;
