import { LOCATION_FAIL, LOCATION_REQUEST, LOCATION_SUCCESS } from "../constants/deviceConstants";

export const locationReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case LOCATION_REQUEST:
            return { loading: true };
        case LOCATION_SUCCESS:
            return { loading: false, location: action.payload };
        case LOCATION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};