import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from 'axios';
import { USER_FAIL, USER_REQUEST, USER_SIGNOUT, USER_SUCCESS, USER_UPDATE_REQUEST } from "../constants/userConstants";
import { REGISTER_URL, SIGNIN_URL, SYNCED_DATA_URL, UPDATE_URL } from "./api";
import { getErrorMessage, modifyGroups, modifyStudent, modifyTeachers } from "../../actions/GlobalFunctions";
import { schoolTypes, subjects, years } from "../../data";
import { MY_TEACHERS_SUCCESS, TEACHERS_SUCCESS } from "../constants/teachersConstants";
import { setMyGroups } from "./groupsActions";
import { MY_GROUPS_SUCCESS } from "../constants/groupsConstants";

export const signIn = ({ emailOrPhoneNumber, password, navigateToUserScreen }) => async (dispatch) => {
    dispatch({ type: USER_REQUEST });
    try {
        let { data: { students, student, closeTeachers, myTeachers, myGroups } } = await Axios.post(SIGNIN_URL, { emailOrPhoneNumber, password });
        if (students) {
            dispatch({ type: USER_SUCCESS });
            navigateToUserScreen(students);
            return
        } else if (!student) return
        myGroups = modifyGroups(myGroups, subjects, years)
        myTeachers = modifyTeachers(myTeachers, subjects, years)
        const userInfo = modifyStudent(student, years, schoolTypes)

        dispatch({ type: TEACHERS_SUCCESS, payload: modifyTeachers(closeTeachers, subjects, years) });
        dispatch({ type: MY_TEACHERS_SUCCESS, payload: myTeachers });
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups });
        dispatch({ type: USER_SUCCESS, payload: userInfo });

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

        dispatch({ type: TEACHERS_SUCCESS, payload: modifyTeachers(closeTeachers, subjects, years) });
        dispatch({ type: MY_TEACHERS_SUCCESS, payload: modifyTeachers(myTeachers, subjects, years) });
        dispatch({ type: MY_GROUPS_SUCCESS, payload: modifyGroups(myGroups, subjects, years) })
        dispatch({ type: USER_SUCCESS, payload: createdStudents });

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
    dispatch({ type: USER_SIGNOUT });
    try {
        await AsyncStorage.removeItem('userInfo');
        console.log('Data removed successfully.');
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:86 ~ signOut ~ error:", error)
    }
};

export const getUserData = () => async (dispatch) => {
    dispatch({ type: USER_REQUEST });
    try {
        const dataJSON = await AsyncStorage.getItem("userInfo");
        if (dataJSON !== null) {
            const userData = JSON.parse(dataJSON);
            dispatch({ type: USER_SUCCESS, payload: userData });
        } else {
            dispatch({ type: USER_FAIL, payload: { error: "No data found" } });
        }
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:101 ~ getUserData ~ error:", error)
        dispatch({
            type: USER_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};
export const setUserData = (data) => async (dispatch) => {
    dispatch({ type: USER_REQUEST });
    const userInfo = modifyStudent(data, years, schoolTypes)
    try {
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log('Data saved successfully.');
        dispatch({ type: USER_SUCCESS, payload: userInfo });
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:118 ~ setUserData ~ error:", error)
        dispatch({
            type: USER_FAIL, payload: getErrorMessage(error?.response?.data ||
                (error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message))
        });
    }
};

export const syncedData = (userInfo) => async (dispatch) => {
    const { id, role, updatedAt } = userInfo
    try {
        const { data: { student } } = await Axios.put(SYNCED_DATA_URL, { id, role, updatedAt });
        if (!student) return
        const userInfo = modifyStudent(student, years, schoolTypes)
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log('user synced success successfully.');
        dispatch(setMyGroups(student.id))
        dispatch({ type: USER_SUCCESS, payload: userInfo });

    } catch (error) {
        console.log("🚀 ~ file: userActions.js:140 ~ syncedData ~ error:", error)
    }

}