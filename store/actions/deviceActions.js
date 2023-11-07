import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from 'axios';
import * as Location from 'expo-location';
import { USER_SIGNOUT } from "../constants/userConstants";
import { LOCATION_FAIL, LOCATION_REQUEST, LOCATION_SUCCESS } from "../constants/deviceConstants";
import { API_URL, LOCATION_URL } from "./api";

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
    setTimeout(() => {
        error = 'Async function error: long time out';
        dispatch({ type: LOCATION_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message });
    }, 2 * 60 * 1000);
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log("🚀 ~ file: deviceActions.js:41 ~ getLocation ~ status:", status)
        if (status !== 'granted') {
            let error = 'Permission to access location was denied';
            dispatch({ type: LOCATION_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message });
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(location.coords);
        console.log("🚀 ~ file: deviceActions.js:46 ~ getLocation ~ address:", "address located")
        dispatch({
            type: LOCATION_SUCCESS, payload: {
                lat: location.coords.latitude,
                lon: location.coords.longitude,
                city: address[0].city,
                governorate: address[0].region,
                gps: true
            }
        });
    } catch (error) {
        console.log("🚀 ~ file: deviceActions.js:45 ~ getLocation ~ error:", error)
        error = 'Failed to fetch location';
        dispatch({ type: LOCATION_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message });
    }
};

export const getLatLon = ({ repeat, city, governorate }) => async (dispatch) => {
    dispatch({ type: LOCATION_REQUEST });
    try {
        const { data } = await Axios.get(LOCATION_URL + `egypt,${governorate},${repeat ? " " : city}`);
        if (data?.length > 0) {
            // console.log("🚀 ~ file: deviceActions.js:79 ~ getLatLon ~ data:", data)
            const lat = data[0].lat;
            const lon = data[0].lon;
            dispatch({
                type: LOCATION_SUCCESS, payload: { lat, lon, city, governorate }
            });
        } else {
            if (!repeat) {
                dispatch(getLatLon({ repeat: true, city: city, governorate: governorate }));
            } else {
                let message = 'No results found for this query';
                dispatch({ type: LOCATION_FAIL, payload: { message } });
            }
        }
    } catch (error) {
        console.log("🚀 ~ file: deviceActions.js:81 ~ getLatLon ~ error:", error)
        let message = 'No location found for this query';
        dispatch({ type: LOCATION_FAIL, payload: { message } });
    }
};