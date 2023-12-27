import { ADVERTISEMENTS_SUCCESS } from "../constants/adsConstants";

export const adsReducer = (state = { advertisements: [] }, action) => {
    switch (action.type) {
        case ADVERTISEMENTS_SUCCESS:
            return { advertisements: action.payload };
        default:
            return state;
    }
};