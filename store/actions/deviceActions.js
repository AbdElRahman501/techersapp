import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from 'axios';
import * as Location from 'expo-location';
import { USER_SIGNOUT } from "../constants/userConstants";
import { API_URL, LOCATION_URL, LOCATION_URL_REVERSE } from "./api";

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

export const previousSessionHandler = async (currentSession) => {
    try {
        if (currentSession) {
            if (currentSession.length > 0) {
                await AsyncStorage.setItem('previousSession', JSON.stringify(currentSession));
            } else {
                await AsyncStorage.removeItem('previousSession');
            }
        } else {
            const dataJSON = await AsyncStorage.getItem('previousSession');
            if (dataJSON) {
                const previousSession = JSON.parse(dataJSON);
                return previousSession
            }
        }
    } catch (error) {
        console.log("🚀 ~ file: deviceActions.js:123 ~ previousSession ~ error:", error)
    }
}

export const getAddressFromCoordinates = async (coordinate) => {
    try {
        let address = await Location.reverseGeocodeAsync(coordinate);
        const { data } = await Axios.get(LOCATION_URL_REVERSE + `lat=${coordinate.latitude}&lon=${coordinate.longitude}`);
        if (data.display_name) {
            return ({
                display_name: data.display_name, lat: Number(data.lat), lon: Number(data.lon), city: address[0].city,
                governorate: address[0].region,
                country: address[0].country,
            });
        } else {
            console.warn('No address found for the given coordinates');
        }
    } catch (error) {
        console.error('Error fetching reverse geocoding data:', error.message);
    }
};

export const getLocation = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return console.log("not granted");
        const isEnabled = await Location.hasServicesEnabledAsync();
        if (!isEnabled) {
            await Location.enableNetworkProviderAsync()
        }
        const lastKnownLocation = await Location.getLastKnownPositionAsync();
        const location = lastKnownLocation ? lastKnownLocation : await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
        let address = await Location.reverseGeocodeAsync(location.coords);
        const { data } = await Axios.get(LOCATION_URL_REVERSE + `lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
        if (!data) return
        return ({
            display_name: data.display_name, lat: location.coords.latitude, lon: location.coords.longitude, city: address[0].city,
            governorate: address[0].region,
            country: address[0].country, gps: true
        });
    } catch (error) {
        console.log("🚀 ~ file: TeacherDataScreen.js:80 ~ getLocation ~ error:", error)
        return;
    }
};