import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';
import languageReducer from './reducers/languageReducer';
import { userReducer, usersReducer } from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import { closeTeachersReducer, myTeachersReducer, teacherInfoReducer } from './reducers/teacherReducers';
import { groupsReducer } from './reducers/groupsReducers';
import { subjectsReducer } from './reducers/subjectsReducers';


const initialState = {
    counter: { count: 0 }
}


const store = configureStore({
    reducer: {
        counter: counterReducer,
        languageState: languageReducer,
        messageState: messageReducer,
        userInfo: userReducer,
        closeTeachersState: closeTeachersReducer,
        teacherInfoState: teacherInfoReducer,
        myGroupsState: groupsReducer,
        myTeachersState: myTeachersReducer,
        usersState: usersReducer,
        subjectsState: subjectsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable the serializable check
            immutableCheck: false, // Disable the immutable state check
        }).concat(thunk),
    preloadedState: initialState,
})
export default store;
