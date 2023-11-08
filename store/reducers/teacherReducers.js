import { MY_TEACHERS_FAIL, MY_TEACHERS_REQUEST, MY_TEACHERS_SUCCESS, CLOSE_TEACHERS_FAIL, CLOSE_TEACHERS_REQUEST, CLOSE_TEACHERS_SUCCESS, TEACHER_FAIL, TEACHER_REQUEST, TEACHER_SUCCESS } from "../constants/teachersConstants";
import { USER_SIGNOUT } from "../constants/userConstants";
const removeDuplicatesById = (array) => {
    const uniqueArray = array.filter((item, index, self) => {
        return index === self.findIndex(obj => obj.id === item.id);
    });
    return uniqueArray;
}
const truncateArray = (arr, requiredLength) => {
    if (arr.length > requiredLength) {
        arr.splice(0, arr.length - requiredLength);
    }
    return arr;
}

export const closeTeachersReducer = (state = { closeTeacher: [] }, action) => {
    switch (action.type) {
        case CLOSE_TEACHERS_REQUEST:
            return { closeTeacher: [], loading: true };
        case CLOSE_TEACHERS_SUCCESS:
            return { loading: false, closeTeacher: action.payload };
        case CLOSE_TEACHERS_FAIL:
            return { closeTeacher: [], loading: false, error: action.payload };
        case USER_SIGNOUT:
            return { closeTeacher: [] };
        default:
            return state;
    }
};

export const myTeachersReducer = (state = { myTeachers: [] }, action) => {
    switch (action.type) {
        case MY_TEACHERS_REQUEST:
            return { myTeachers: state.myTeachers, loading: true };
        case MY_TEACHERS_SUCCESS:
            return { loading: false, myTeachers: action.payload };
        case MY_TEACHERS_FAIL:
            return { myTeachers: state.myTeachers, loading: false, error: action.payload };
        case USER_SIGNOUT:
            return { myTeachers: [] };
        default:
            return state;
    }
};

export const teacherInfoReducer = (state = { teachersHistory: [] }, action) => {
    switch (action.type) {
        case TEACHER_REQUEST:
            return { ...state, loading: true };
        case TEACHER_SUCCESS:
            const stateHistory = truncateArray(removeDuplicatesById(state.teachersHistory), 5)
            return { loading: false, teachersHistory: [...stateHistory, action.payload] };
        case TEACHER_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};