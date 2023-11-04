import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from 'axios';
import { USER_FAIL, USER_REQUEST, USER_SIGNOUT, USER_SUCCESS, USER_UPDATE_REQUEST } from "../constants/userConstants";
import { REGISTER_URL, SIGNIN_URL, UPDATE_URL } from "./api";
import { getErrorMessage, getSubjectTitle } from "../../actions/GlobalFunctions";
import { schoolTypes, subjects, years } from "../../data";
import { TEACHERS_SUCCESS } from "../constants/teachersConstants";

function getTheYear(yearValue) {
    return years.find(x => x.value === yearValue)
}
function getTheEducation(educationTypeValue) {
    return schoolTypes.find(x => x.en === educationTypeValue)
}
const getSubject = (subject) => {
    return subjects.find(x => x.en === subject)
}
export const signIn = ({ emailOrPhoneNumber, password, navigateToUserScreen }) => async (dispatch) => {
    dispatch({ type: USER_REQUEST });
    try {
        let { data } = await Axios.post(SIGNIN_URL, { emailOrPhoneNumber, password });
        if (!data) return
        if (data.students) {
            dispatch({ type: USER_SUCCESS });
            navigateToUserScreen(data.students);
            return
        } else if (!data.student) return
        if (data?.teachers?.length > 0) {
            const teachers = data.teachers.map(x => {
                x.mainSubject = { ...getSubject(x.mainSubject.subject), schoolYears: x.mainSubject.schoolYears.map(y => getTheYear(y)) }
                return x
            })
            await AsyncStorage.setItem("teachers", JSON.stringify(teachers));
            dispatch({ type: TEACHERS_SUCCESS, payload: teachers });
        }
        const userInfo = { ...data.student, schoolYear: getTheYear(data.student.schoolYear), educationType: getTheEducation(data.student.educationType) }
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log('Data saved successfully.');
        dispatch({ type: USER_SUCCESS, payload: userInfo });
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:29 ~ register ~ error:", error?.response?.data || error)
        dispatch({ type: USER_FAIL, payload: getErrorMessage(error?.response?.data || error) });
    }
};


export const register = (userData) => async (dispatch) => {
    dispatch({ type: USER_REQUEST });
    try {
        let { data } = await Axios.post(REGISTER_URL, userData);
        if (!data) return
        data = { ...data, schoolYear: getTheYear(data.schoolYear), educationType: getTheEducation(data.educationType) }
        await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        console.log('Data saved successfully.');
        dispatch({ type: USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:29 ~ register ~ error:", error?.response?.data || error)
        dispatch({ type: USER_FAIL, payload: getErrorMessage(error?.response?.data || error) });
    }
};
export const update = (userData) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: getState().userInfo.userInfo });
    try {
        let { data } = await Axios.put(UPDATE_URL, userData);
        if (!data) return
        data = { ...data, schoolYear: getTheYear(data.schoolYear), educationType: getTheEducation(data.educationType) }
        await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        console.log('Data saved successfully.');
        dispatch({ type: USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:29 ~ register ~ error:", error?.response?.data || error)
        dispatch({ type: USER_FAIL, payload: getErrorMessage(error?.response?.data || error) });
    }
};
export const signOut = () => async (dispatch) => {
    dispatch({ type: USER_SIGNOUT });
    try {
        await AsyncStorage.removeItem('userInfo');
        console.log('Data removed successfully.');
    } catch (error) {
        console.error('Error removing data:', error);
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
        console.error('Error fetching data:', error);
        dispatch({ type: USER_FAIL, payload: error });
    }
};
export const setUserData = (data) => async (dispatch) => {
    dispatch({ type: USER_REQUEST });
    data = { ...data, schoolYear: getTheYear(data.schoolYear), educationType: getTheEducation(data.educationType) }
    try {
        await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        console.log('Data saved successfully.');
        dispatch({ type: USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:29 ~ register ~ error:", error?.response?.data || error)
        dispatch({ type: USER_FAIL, payload: getErrorMessage(error?.response?.data || error) });
    }
};