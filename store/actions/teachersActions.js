import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TEACHERS_URL } from './api';
import { TEACHERS_FAIL, TEACHERS_REQUEST, TEACHERS_SUCCESS, TEACHER_FAIL, TEACHER_REQUEST, TEACHER_SUCCESS } from '../constants/teachersConstants';

import { subjects, years } from "../../data";
function getTheYear(yearValue) {
    return years.find(x => x.value === yearValue)
}
const getSubject = (subject) => {
    const { imageSource, ...others } = subjects.find(x => x.en === subject)
    return others
}
export const getTeachers = () => async (dispatch) => {
    dispatch({ type: TEACHERS_REQUEST });
    try {
        const { data: teachers } = await Axios.post(TEACHERS_URL, { emailOrPhoneNumber, password });
        if (!teachers) return
        console.log('Data saved successfully.');
        dispatch({ type: TEACHERS_SUCCESS, payload: teachers });
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:29 ~ register ~ error:", error?.response?.data || error)
        dispatch({ type: TEACHERS_FAIL, payload: error });
    }
};
export const getTeacherInfo = (id) => async (dispatch) => {
    dispatch({ type: TEACHER_REQUEST });
    try {
        const { data: teacher } = await Axios.get(TEACHERS_URL + id);
        if (!teacher) return
        teacher.mainSubject = { ...getSubject(teacher.mainSubject.subject), schoolYears: teacher.mainSubject.schoolYears.map(y => getTheYear(y)) }
        teacher.groups = teacher.groups?.map(y => {
            y.subject = getSubject(y.subject)
            y.schoolYear = getTheYear(y.schoolYear)
            return y
        })
        dispatch({ type: TEACHER_SUCCESS, payload: teacher });
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:29 ~ register ~ error:", error?.response?.data || error)
        dispatch({
            type: TEACHER_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getTeachersData = () => async (dispatch) => {
    dispatch({ type: TEACHERS_REQUEST });
    try {
        const dataJSON = await AsyncStorage.getItem("teachers");
        if (dataJSON !== null) {
            const teachers = JSON.parse(dataJSON);
            dispatch({ type: TEACHERS_SUCCESS, payload: teachers });
        } else {
            dispatch({ type: TEACHERS_FAIL, payload: { error: "No data found" } });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        dispatch({ type: TEACHERS_FAIL, payload: error });
    }
};