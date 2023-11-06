import { MY_GROUPS_REQUEST, MY_GROUPS_SUCCESS, MY_GROUPS_FAIL } from "../constants/groupsConstants";

export const groupsReducer = (state = { myGroups: [] }, action) => {
    switch (action.type) {
        case MY_GROUPS_REQUEST:
            return { ...state, loading: true };
        case MY_GROUPS_SUCCESS:
            return { loading: false, myGroups: action.payload };
        case MY_GROUPS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
