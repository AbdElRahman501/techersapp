import { USER_FAIL, USER_REQUEST, USER_SIGNOUT, USER_UPDATE_REQUEST, USER_SUCCESS, USERS_REQUEST, USERS_SUCCESS, USERS_FAIL, USERS_SWITCHING_REQUEST, USERS_SWITCHING_SUCCESS, USERS_SWITCHING_FAIL } from "../constants/userConstants";

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return { loading: true };
        case USER_UPDATE_REQUEST:
            return { loading: true, userInfo: action.payload };
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


export const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case USERS_REQUEST:
            return { loading: true };
        case USERS_SUCCESS:
            return { loading: false, users: action.payload };
        case USERS_FAIL:
            return { loading: false, error: action.payload };
        case USERS_SWITCHING_REQUEST:
            return { ...state, switchLoading: true };
        case USERS_SWITCHING_SUCCESS:
            return { ...state, switchLoading: false };
        case USERS_SWITCHING_FAIL:
            return { ...state, switchLoading: false, switchError: action.payload };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}