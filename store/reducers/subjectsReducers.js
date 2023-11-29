import { SCHOOL_YEARS_SUCCESS, SUBJECTS_SUCCESS } from "../constants/subjectsConstants";
import { USER_SIGNOUT } from "../constants/userConstants";

export const subjectsReducer = (state = { subjects: [] }, action) => {
    switch (action.type) {
        case SUBJECTS_SUCCESS:
            return { loading: false, subjects: action.payload };
        default:
            return state;
    }
};
export const schoolYearsReducer = (state = { schoolYears: [] }, action) => {
    switch (action.type) {
        case SCHOOL_YEARS_SUCCESS:
            return { loading: false, schoolYears: action.payload };
        default:
            return state;
    }
};