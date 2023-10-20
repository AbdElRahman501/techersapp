import { USER_FAIL, USER_REQUEST, USER_SIGNOUT,USER_UPDATE_REQUEST, USER_SUCCESS } from "../constants/userConstants";

export const userReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return { loading: true };
        case USER_UPDATE_REQUEST:
            return { loading: true , userInfo: action.payload };
        case USER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
};
