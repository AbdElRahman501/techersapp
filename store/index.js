import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';
import languageReducer from './reducers/languageReducer';
import { userReducer } from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import { locationReducer } from './reducers/deviceReducers';
import { closeTeachersReducer, myTeachersReducer, teacherInfoReducer } from './reducers/teacherReducers';
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
        closeTeachersState: closeTeachersReducer,
        teacherInfoState: teacherInfoReducer,
        myGroupsState: groupsReducer,
        myTeachersState: myTeachersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable the serializable check
            immutableCheck: false, // Disable the immutable state check
        }).concat(thunk),
    preloadedState: initialState,
})
export default store;
