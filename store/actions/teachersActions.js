import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CLOSE_TEACHERS_URL, TEACHERS_URL } from './api';
import { MY_TEACHERS_FAIL, MY_TEACHERS_REQUEST, MY_TEACHERS_SUCCESS, CLOSE_TEACHERS_FAIL, CLOSE_TEACHERS_REQUEST, CLOSE_TEACHERS_SUCCESS, TEACHER_FAIL, TEACHER_REQUEST, TEACHER_SUCCESS } from '../constants/teachersConstants';

export const getCloseTeachers = (id) => async (dispatch) => {
    try {
        const dataJSON = await AsyncStorage.getItem("closeTeachers");
        if (dataJSON !== null) {
            const teachers = JSON.parse(dataJSON);
            dispatch({ type: CLOSE_TEACHERS_SUCCESS, payload: teachers });
            console.log('local close teachers fetched successfully.');
        }
        const { data: closeTeachers } = await Axios.get(CLOSE_TEACHERS_URL + id);
        if (!closeTeachers) return
        dispatch({ type: CLOSE_TEACHERS_SUCCESS, payload: closeTeachers });
        await AsyncStorage.setItem("closeTeachers", JSON.stringify(closeTeachers));
        console.log('server close teachers fetched successfully.');
    } catch (error) {
        console.log("🚀 ~ file: teachersActions.js:24 ~ getCloseTeachers ~ error:", error)
    }
};
export const getTeacherInfo = (id) => async (dispatch) => {
    dispatch({ type: TEACHER_REQUEST });
    try {
        const { data: teacher } = await Axios.get(TEACHERS_URL + id);
        if (!teacher) return
        dispatch({ type: TEACHER_SUCCESS, payload: teacher });
        console.log('teacher info fetched successfully.');
    } catch (error) {
        console.log("🚀 ~ file: teachersActions.js:44 ~ getTeacherInfo ~ error:", error.response && error.response.data.message
            ? error.response.data.message
            : error.message,)
        dispatch({
            type: TEACHER_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getTeachersData = () => async (dispatch) => {
    dispatch({ type: CLOSE_TEACHERS_REQUEST });
    try {
        const dataJSON = await AsyncStorage.getItem("closeTeachers");
        if (dataJSON !== null) {
            const teachers = JSON.parse(dataJSON);
            dispatch({ type: CLOSE_TEACHERS_SUCCESS, payload: teachers });
            console.log('local teachers fetched successfully.');
        } else {
            dispatch({ type: CLOSE_TEACHERS_FAIL, payload: { error: "No data found" } });
        }
    } catch (error) {
        console.log("🚀 ~ file: teachersActions.js:65 ~ getTeachersData ~ error:", error)
        dispatch({
            type: CLOSE_TEACHERS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const getMyTeachersData = () => async (dispatch) => {
    dispatch({ type: MY_TEACHERS_REQUEST });
    try {
        const dataJSON = await AsyncStorage.getItem("myTeachers");
        if (dataJSON !== null) {
            const myTeachers = JSON.parse(dataJSON);
            dispatch({ type: MY_TEACHERS_SUCCESS, payload: myTeachers });
            console.log('local my teachers fetched successfully.');
        }
    } catch (error) {
        console.log("🚀 ~ file: teachersActions.js:86 ~ getMyTeachersData ~ error:", error)
        dispatch({
            type: MY_TEACHERS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};