import { TEACHERS_FAIL, TEACHERS_REQUEST, TEACHERS_SUCCESS, TEACHER_FAIL, TEACHER_REQUEST, TEACHER_SUCCESS } from "../constants/teachersConstants";
export const teachersReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHERS_REQUEST:
            return { loading: true };
        case TEACHERS_SUCCESS:
            return { loading: false, teachers: action.payload };
        case TEACHERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const teacherInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHER_REQUEST:
            return { loading: true };
        case TEACHER_SUCCESS:
            return { loading: false, teacher: action.payload };
        case TEACHER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};