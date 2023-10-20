import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from 'axios';
import * as Location from 'expo-location';
import { USER_SIGNOUT } from "../constants/userConstants";
import { LOCATION_FAIL, LOCATION_REQUEST, LOCATION_SUCCESS } from "../constants/deviceConstants";
import { API_URL } from "./api";

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

export const serverWakeUp = () => async () => {
    const time = Date.now();
    try {
        const { data } = await Axios.get(API_URL);
        const timeSpent = Date.now() - time;
        console.log("🚀 ~userActions.js:79", data.message, 'after ' + timeSpent + 'ms');
    } catch (error) {
        console.log('Error clearing local storage:', error);
    }
};

export const getLocation = () => async (dispatch) => {
    dispatch({ type: LOCATION_REQUEST });
    console.log("location request");
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log("🚀 ~ file: deviceActions.js:41 ~ getLocation ~ status:", status)
        if (status !== 'granted') {
            let error = 'Permission to access location was denied';
            dispatch({ type: LOCATION_FAIL, payload: error });
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log("🚀 ~ file: deviceActions.js:42 ~ getLocation ~ location:", location)
        dispatch({ type: LOCATION_SUCCESS, payload: location });

    } catch (error) {
        console.log("🚀 ~ file: deviceActions.js:45 ~ getLocation ~ error:", error)
        dispatch({ type: LOCATION_FAIL, payload: error });
    }
};

