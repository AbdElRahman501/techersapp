import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from 'axios';
import { USERS_FAIL, USERS_REQUEST, USERS_SUCCESS, USERS_SWITCHING_FAIL, USERS_SWITCHING_REQUEST, USERS_SWITCHING_SUCCESS, USER_FAIL, USER_REQUEST, USER_SIGNOUT, USER_SUCCESS, USER_UPDATE_REQUEST } from "../constants/userConstants";
import { REGISTER_URL, SIGNIN_URL, SYNCED_DATA_URL, UPDATE_URL } from "./api";
import { getErrorMessage, modifyGroups, modifyStudent, modifyTeachers } from "../../actions/GlobalFunctions";
import { schoolTypes, subjects, years } from "../../data";
import { MY_TEACHERS_SUCCESS, CLOSE_TEACHERS_SUCCESS } from "../constants/teachersConstants";
import { MY_GROUPS_SUCCESS } from "../constants/groupsConstants";
import { showMessage } from "./showMessageActions";

export const signIn = ({ id, emailOrPhoneNumber, password, navigateToUserScreen }) => async (dispatch) => {
    dispatch({ type: USER_REQUEST });
    try {
        let { data: { students, student, closeTeachers, myTeachers, myGroups } } = await Axios.post(SIGNIN_URL, { emailOrPhoneNumber, password, id });
        if (students) {
            const users = students.map(student => (modifyStudent({ ...student, password }, years, schoolTypes)))
            dispatch({ type: USER_SUCCESS });
            dispatch({ type: USERS_SUCCESS, payload: users });
            await AsyncStorage.setItem("users", JSON.stringify(users));
            navigateToUserScreen(users);
            return
        } else if (!student) return
        myGroups = modifyGroups(myGroups, subjects, years)
        myTeachers = modifyTeachers(myTeachers, subjects, years)
        closeTeachers = modifyTeachers(closeTeachers, subjects, years)
        const userInfo = modifyStudent(student, years, schoolTypes)

        dispatch({ type: CLOSE_TEACHERS_SUCCESS, payload: closeTeachers });
        dispatch({ type: MY_TEACHERS_SUCCESS, payload: myTeachers });
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups });
        dispatch({ type: USER_SUCCESS, payload: userInfo });

        await AsyncStorage.setItem("closeTeachers", JSON.stringify(closeTeachers));
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        await AsyncStorage.setItem("myTeachers", JSON.stringify(myTeachers));

        console.log('user Info sign in  successfully.');
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:29 ~ signIn ~ error:", error)
        dispatch({
            type: USER_FAIL, payload: getErrorMessage(error?.response?.data ||
                (error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message))
        });
    }
};


export const register = (userData) => async (dispatch) => {
    dispatch({ type: USER_REQUEST });
    try {
        let { data: { createdStudents, closeTeachers, myTeachers, myGroups } } = await Axios.post(REGISTER_URL, userData);
        if (!createdStudents) return
        myGroups = modifyGroups(myGroups, subjects, years)
        myTeachers = modifyTeachers(myTeachers, subjects, years)
        closeTeachers = modifyTeachers(closeTeachers, subjects, years)

        dispatch({ type: CLOSE_TEACHERS_SUCCESS, payload: closeTeachers });
        dispatch({ type: MY_TEACHERS_SUCCESS, payload: myTeachers });
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups })
        dispatch({ type: USER_SUCCESS, payload: createdStudents });

        await AsyncStorage.setItem("closeTeachers", JSON.stringify(closeTeachers));
        await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        await AsyncStorage.setItem("myTeachers", JSON.stringify(myTeachers));
        await AsyncStorage.setItem("userInfo", JSON.stringify(createdStudents));
        console.log('userInfo registered successfully.');
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:52 ~ register ~ error:", error)
        dispatch({
            type: USER_FAIL, payload: getErrorMessage(error?.response?.data ||
                (error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message))
        });
    }
};
export const update = (userData) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: getState().userInfo.userInfo });
    try {
        let { data } = await Axios.put(UPDATE_URL, userData);
        if (!data) return
        const userInfo = modifyStudent(data, years, schoolTypes)
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log('userInfo updated successfully.');
        dispatch({ type: USER_SUCCESS, payload: userInfo });
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:71 ~ update ~ error:", error)
        dispatch({
            type: USER_FAIL, payload: getErrorMessage(error?.response?.data ||
                (error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message))
        });
    }
};
export const signOut = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('myGroups');
        await AsyncStorage.removeItem('myTeachers');
        await AsyncStorage.removeItem('closeTeachers');
        await AsyncStorage.removeItem("users");
        dispatch({ type: USER_SIGNOUT });
        console.log('Data removed successfully.');
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:86 ~ signOut ~ error:", error)
    }
};

export const getUsers = () => async (dispatch) => {
    dispatch({ type: USERS_REQUEST });
    try {
        const dataJSON = await AsyncStorage.getItem("users");
        if (dataJSON !== null) {
            const users = JSON.parse(dataJSON);
            dispatch({ type: USERS_SUCCESS, payload: users });
        }
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:101 ~ getUserData ~ error:", error)
        dispatch({
            type: USERS_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};

export const syncedData = (userInfo) => async (dispatch) => {
    const { id, role, updatedAt } = userInfo
    try {
        let { data: { student, closeTeachers, myTeachers, myGroups } } = await Axios.put(SYNCED_DATA_URL, { id, role, updatedAt });
        if (!student) return
        myGroups = modifyGroups(myGroups, subjects, years)
        myTeachers = modifyTeachers(myTeachers, subjects, years)
        closeTeachers = modifyTeachers(closeTeachers, subjects, years)
        const userInfo = modifyStudent(student, years, schoolTypes)

        dispatch({ type: CLOSE_TEACHERS_SUCCESS, payload: closeTeachers });
        dispatch({ type: MY_TEACHERS_SUCCESS, payload: myTeachers });
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups });
        dispatch({ type: USER_SUCCESS, payload: userInfo });


        await AsyncStorage.setItem("closeTeachers", JSON.stringify(closeTeachers));
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        await AsyncStorage.setItem("myTeachers", JSON.stringify(myTeachers));

        console.log("user synced successfully.");

    } catch (error) {
        console.log("🚀 ~ file: userActions.js:140 ~ syncedData ~ error:", error)
    }

}

export const switchUsers = ({ id, password }) => async (dispatch) => {
    dispatch({ type: USERS_SWITCHING_REQUEST });

    try {
        let { data: { student, closeTeachers, myTeachers, myGroups } } = await Axios.post(SIGNIN_URL, { password, id });
        if (!student) return
        myGroups = modifyGroups(myGroups, subjects, years)
        myTeachers = modifyTeachers(myTeachers, subjects, years)
        closeTeachers = modifyTeachers(closeTeachers, subjects, years)
        const userInfo = modifyStudent(student, years, schoolTypes)

        dispatch({ type: CLOSE_TEACHERS_SUCCESS, payload: closeTeachers });
        dispatch({ type: MY_TEACHERS_SUCCESS, payload: myTeachers });
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups });
        dispatch({ type: USER_SUCCESS, payload: userInfo });
        dispatch({ type: USERS_SWITCHING_SUCCESS });


        await AsyncStorage.setItem("closeTeachers", JSON.stringify(closeTeachers));
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        await AsyncStorage.setItem("myTeachers", JSON.stringify(myTeachers));

        console.log('user switched successfully.');
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:29 ~ signIn ~ error:", error)
        dispatch(showMessage("Failed to switch user"))
        dispatch({
            type: USERS_SWITCHING_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });

    }
};