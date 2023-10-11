import { USER_FAIL, USER_REQUEST, USER_SIGNOUT, USER_SUCCESS } from "../constants/userConstants";

export const userReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return { loading: true };
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
