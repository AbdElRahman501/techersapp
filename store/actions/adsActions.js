import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADVERTISEMENTS_URL } from './api';
import { ADVERTISEMENTS_SUCCESS } from '../constants/adsConstants';
import { isDataExpired } from "../../actions/GlobalFunctions";

export const getAds = (id) => async (dispatch) => {
    try {
        const dataJSON = await AsyncStorage.getItem("advertisements");
        if (dataJSON !== null) {
            let advertisements = JSON.parse(dataJSON);
            advertisements.filter(x => isDataExpired(x.endDate))
            console.log('local advertisements fetched successfully.');
            dispatch({ type: ADVERTISEMENTS_SUCCESS, payload: advertisements });
        }
        const { data: advertisements } = await Axios.get(ADVERTISEMENTS_URL + id);
        if (!advertisements) return []
        await AsyncStorage.setItem("advertisements", JSON.stringify(advertisements));
        console.log('server advertisements fetched successfully.');
        dispatch({ type: ADVERTISEMENTS_SUCCESS, payload: advertisements });
    } catch (error) {
        console.log("🚀 ~ file: adsActions.js:22 ~ getAds ~ error:", (error?.response?.data ||
            (error.response && error.response.data.message
                ? error.response.data.message
                : error.message)))
    }
};

export const adClicked = async (id) => {
    console.log("🚀 ~ file: adsActions.js:30 ~ adClicked ~ id:", id)
    try {
        const { data } = await Axios.get(ADVERTISEMENTS_URL + '/click/' + id);
        console.log("🚀 ~ file: adsActions.js:31 ~ adClicked ~ data:", data)
    } catch (error) {
        console.log("🚀 ~ file: adsActions.js:22 ~ getAds ~ error:", (error?.response?.data ||
            (error.response && error.response.data.message
                ? error.response.data.message
                : error.message)))
    }


}