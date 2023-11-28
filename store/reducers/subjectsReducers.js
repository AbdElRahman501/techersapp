import { SUBJECTS_SUCCESS } from "../constants/subjectsConstants";
import { USER_SIGNOUT } from "../constants/userConstants";

export const subjectsReducer = (state = { subjects: [] }, action) => {
    switch (action.type) {
        case SUBJECTS_SUCCESS:
            return { loading: false, subjects: action.payload };
        case USER_SIGNOUT:
            return { closeTeacher: [] };
        default:
            return state;
    }
};