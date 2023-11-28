import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SUBJECTS_URL } from './api';
import { SUBJECTS_SUCCESS } from '../constants/subjectsConstants';


export const getSubjects = (id) => async (dispatch) => {
    try {
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