import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MY_GROUPS_REQUEST, MY_GROUPS_SUCCESS, MY_GROUPS_FAIL } from '../constants/groupsConstants';
import { ADD_GROUP_URL, TEACHERS_URL } from './api';
import { removeDuplicatesById } from '../../actions/GlobalFunctions';
import { USER_SUCCESS } from '../constants/userConstants';
import { MY_TEACHERS_SUCCESS, MY_TEACHERS_UPDATE, TEACHER_SUCCESS } from '../constants/teachersConstants';
import { showMessage } from './showMessageActions';

export const addGroup = (newGroup, newTeacher) => async (dispatch, getState) => {
    dispatch({ type: MY_GROUPS_REQUEST })

    try {
        const { id, role } = getState().userInfo.userInfo
        const { data: teacher } = await Axios.get(TEACHERS_URL + newTeacher.id);
        if (!teacher) return
        if (teacher.updatedAt !== newTeacher.updatedAt) {
            dispatch({ type: MY_GROUPS_FAIL, payload: { message: "Teacher data is outdated", refresh: true } })
            console.log("🚀 ~ file: groupsActions.js:21 ~ addGroup ~ Teacher data is outdated:")
            return
        }
        let myGroups = getState().myGroupsState.myGroups
        let myTeachers = getState().myTeachersState.myTeachers
        myTeachers = removeDuplicatesById([...myTeachers, teacher])

        const existGroup = myGroups.find(x => x.teacherId === newGroup.teacherId && x.subject === newGroup.subject)
        if (existGroup) {
            myGroups = myGroups.filter(x => !(x.id === existGroup.id && x.teacherId === existGroup.teacherId))
        }
        myGroups = [...myGroups, newGroup];
        const serverGroups = myGroups.map(x => ({ id: x.id, teacherId: x.teacherId, color: x.color }))

        const { data: userInfo } = await Axios.put(ADD_GROUP_URL, { id, role, myGroups: serverGroups })
        if (!userInfo) return
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups })
        dispatch({ type: MY_TEACHERS_SUCCESS, payload: myTeachers });
        dispatch({ type: USER_SUCCESS, payload: userInfo });
        await AsyncStorage.setItem("myTeachers", JSON.stringify(myTeachers));
        await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log('group added successfully.');
    } catch (error) {
        console.log("🚀 ~ file: groupsActions.js:25 ~ addGroup ~ error:", error)
        dispatch(showMessage("Failed to add group"))
        dispatch({
            type: MY_GROUPS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const leaveGroup = (groupId, teacherId) => async (dispatch, getState) => {
    console.log("🚀 ~ file: groupsActions.js:41 ~ leaveGroup ~ groupId, teacherId:", groupId, teacherId)
    dispatch({ type: MY_GROUPS_REQUEST })
    try {
        const { id, role } = getState().userInfo.userInfo
        let myGroups = getState().myGroupsState.myGroups || []
        let myTeachers = getState().myTeachersState.myTeachers
        myGroups = myGroups.filter(x => !(x.id === groupId && x.teacherId === teacherId));
        const myTeachersId = myGroups.map(y => y.teacherId)
        myTeachers = myTeachers.filter(x => myTeachersId.includes(x.id))
        const serverGroups = myGroups.map(x => ({ id: x.id, teacherId: x.teacherId, }))
        const { data: userInfo } = await Axios.put(ADD_GROUP_URL, { id, role, myGroups: serverGroups })
        if (!userInfo) return
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups })
        dispatch({ type: MY_TEACHERS_SUCCESS, payload: myTeachers });
        dispatch({ type: USER_SUCCESS, payload: userInfo });
        await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        await AsyncStorage.setItem("myTeachers", JSON.stringify(myTeachers));
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log('group removed successfully.');
    } catch (error) {
        dispatch(showMessage("Failed to remove group"))
        console.log("🚀 ~ file: groupsActions.js:25 ~ addGroup ~ error:", error)
        dispatch({
            type: MY_GROUPS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const getMyGroups = () => async (dispatch) => {
    dispatch({ type: MY_GROUPS_REQUEST })
    try {
        const myGroupsJSON = await AsyncStorage.getItem("myGroups");
        const myGroups = JSON.parse(myGroupsJSON);
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups || [] })
        console.log('local groups fetched successfully.');
    } catch (error) {
        console.log("🚀 ~ file: groupsActions.js:44 ~ getMyGroups ~ error:", error)
        dispatch({
            type: MY_GROUPS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}
