import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_FAIL, USER_REQUEST, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_SUCCESS } from "../constatnts/userConstants";

export const signIn = (userData) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
        console.log('Data saved successfully.');
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: userData });
        dispatch(getUserData())
    } catch (error) {
        console.log('Error saving data:', error);
        dispatch({ type: USER_SIGNIN_FAIL, payload: error });
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
