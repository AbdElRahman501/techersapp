import { MY_GROUPS_REQUEST, MY_GROUPS_SUCCESS, MY_GROUPS_FAIL } from "../constants/groupsConstants";
import { USER_SIGNOUT } from "../constants/userConstants";

export const groupsReducer = (state = { myGroups: [] }, action) => {
    switch (action.type) {
        case MY_GROUPS_REQUEST:
            return { ...state, loading: true };
        case MY_GROUPS_SUCCESS:
            return { loading: false, myGroups: action.payload };
        case MY_GROUPS_FAIL:
            return { loading: false, myGroups: state.myGroups, error: action.payload };
        case USER_SIGNOUT:
            return { myGroups: [] };
        default:
            return state;
    }
};
