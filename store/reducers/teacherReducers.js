import { MY_TEACHERS_FAIL, MY_TEACHERS_REQUEST, MY_TEACHERS_SUCCESS, TEACHERS_FAIL, TEACHERS_REQUEST, TEACHERS_SUCCESS, TEACHER_FAIL, TEACHER_REQUEST, TEACHER_SUCCESS } from "../constants/teachersConstants";
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

export const myTeachersReducer = (state = {}, action) => {
    switch (action.type) {
        case MY_TEACHERS_REQUEST:
            return { loading: true };
        case MY_TEACHERS_SUCCESS:
            return { loading: false, teachers: action.payload };
        case MY_TEACHERS_FAIL:
            return { loading: false, error: action.payload };
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