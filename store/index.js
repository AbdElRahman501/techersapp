import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';
import languageReducer from './reducers/languageReducer';
import { userReducer } from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import { locationReducer } from './reducers/deviceReducers';
import { teacherInfoReducer, teachersReducer } from './reducers/teacherReducers';
import { groupsReducer } from './reducers/groupsReducers';


const initialState = {
    counter: { count: 0 }
}


const store = configureStore({
    reducer: {
        counter: counterReducer,
        languageState: languageReducer,
        messageState: messageReducer,
        userInfo: userReducer,
        locationState: locationReducer,
        teachersState: teachersReducer,
        teacherInfoState: teacherInfoReducer,
        myGroupsState: groupsReducer
    },
    preloadedState: initialState,
    devTools: false,
}, applyMiddleware(thunk))
export default store;
