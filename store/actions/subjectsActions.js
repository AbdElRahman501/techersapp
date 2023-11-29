import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCHOOL_YEARS_URL, SUBJECTS_URL } from './api';
import { SCHOOL_YEARS_SUCCESS, SUBJECTS_SUCCESS } from '../constants/subjectsConstants';


export const getSubjects = (id) => async (dispatch) => {
    try {
        dispatch(getSchoolYears())
        const dataJSON = await AsyncStorage.getItem("subjects");
        if (dataJSON !== null) {
            const subjects = JSON.parse(dataJSON);
            console.log('local subjects fetched successfully.');
            dispatch({ type: SUBJECTS_SUCCESS, payload: subjects });
        }
        const { data: subjects } = await Axios.get(SUBJECTS_URL + (id || ''));
        if (!subjects) return []
        await AsyncStorage.setItem("subjects", JSON.stringify(subjects));
        console.log('server subjects fetched successfully.');
        dispatch({ type: SUBJECTS_SUCCESS, payload: subjects });
    } catch (error) {
        console.log("🚀 ~ file: subjectsActions.js:16 ~ getSubjects ~ error:", error)
    }
};

export const getSchoolYears = () => async (dispatch) => {
    try {
        const dataJSON = await AsyncStorage.getItem("schoolYears");
        if (dataJSON !== null) {
            const schoolYears = JSON.parse(dataJSON);
            console.log('local schoolYears fetched successfully.');
            dispatch({ type: SCHOOL_YEARS_SUCCESS, payload: schoolYears });
        }
        const { data: schoolYears } = await Axios.get(SCHOOL_YEARS_URL);
        if (!schoolYears) return []
        await AsyncStorage.setItem("schoolYears", JSON.stringify(schoolYears));
        console.log('server schoolYears fetched successfully.');
        dispatch({ type: SCHOOL_YEARS_SUCCESS, payload: schoolYears });
    } catch (error) {
        console.log("🚀 ~ file: subjectsActions.js:16 ~ getSubjects ~ error:", error)
    }
};