import { MY_TEACHERS_FAIL, MY_TEACHERS_REQUEST, MY_TEACHERS_SUCCESS, CLOSE_TEACHERS_FAIL, CLOSE_TEACHERS_REQUEST, CLOSE_TEACHERS_SUCCESS, TEACHER_FAIL, TEACHER_REQUEST, TEACHER_SUCCESS, MY_TEACHERS_UPDATE, CLOSE_TEACHERS_UPDATE } from "../constants/teachersConstants";
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
        case CLOSE_TEACHERS_UPDATE:
            let closeTeacher = state.closeTeacher
            const teacher = action.payload;
            const myTeacher = closeTeacher.find(t => t.id === teacher.id);
            const index = closeTeacher.indexOf(myTeacher);
            if (myTeacher) {
                closeTeacher = closeTeacher.filter(t => t.id !== teacher.id)
                closeTeacher.splice(index, 0, teacher);
            }
            return { closeTeacher: closeTeacher, loading: false, error: false };
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
        case MY_TEACHERS_UPDATE:
            let myTeachers = state.myTeachers
            const teacher = action.payload;
            const myTeacher = myTeachers.find(t => t.id === teacher.id);
            const index = myTeachers.indexOf(myTeacher);
            if (myTeacher) {
                myTeachers = myTeachers.filter(t => t.id !== teacher.id)
                myTeachers.splice(index, 0, teacher);
            }
            return { myTeachers: myTeachers, loading: false, error: false };
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
            const teacher = action.payload
            const teachersHistory = stateHistory.filter(t => t.id !== teacher.id)
            teachersHistory.push(teacher)
            return { loading: false, teachersHistory: teachersHistory };
        case TEACHER_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};