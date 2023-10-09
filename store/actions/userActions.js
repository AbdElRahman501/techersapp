import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from 'axios';
import { USER_FAIL, USER_REQUEST, USER_SIGNOUT, USER_SUCCESS } from "../constants/userConstants";
import { REGISTER_URL, SIGNIN_URL } from "./api";
import { getErrorMessage } from "../../actions/GlobalFunctions";

export const signIn = ({ emailOrPhoneNumber, password }) => async (dispatch) => {
    dispatch({ type: USER_REQUEST });
    try {
        const { data } = await Axios.post(SIGNIN_URL, { emailOrPhoneNumber, password });
        if (!data) return
        await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        console.log('Data saved successfully.');
        dispatch({ type: USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("🚀 ~ file: userActions.js:29 ~ register ~ error:", error?.response?.data || error)
        dispatch({ type: USER_FAIL, payload: getErrorMessage(error?.response?.data || error) });
    }
};
export const register = (userData) => async (dispatch) => {
    dispatch({ type: USER_REQUEST });
    try {
        const { data } = await Axios.post(REGISTER_URL, userData);
        if (!data) return
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

export const updateVersion = (newVersion) => async (dispatch) => {
    try {
        const version = await AsyncStorage.getItem('version');
        if (version !== newVersion) {
            await AsyncStorage.clear();
            console.log('storage cleared');
            dispatch({ type: USER_SIGNOUT });
            await AsyncStorage.setItem('version', newVersion);
            console.log('new version ' + newVersion + ' saved');
        } else {
            console.log('your version ' + newVersion + ' is the newest');
        }
    } catch (error) {
        console.log('Error clearing local storage:', error);
    }
};