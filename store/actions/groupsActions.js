import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MY_GROUPS_REQUEST, MY_GROUPS_SUCCESS, MY_GROUPS_FAIL } from '../constants/groupsConstants';
import { ADD_GROUP_URL, MY_GROUPS_URL } from './api';
import { schoolTypes, subjects, years } from "../../data";
import { modifyGroups, modifyStudent } from '../../actions/GlobalFunctions';
import { USER_SUCCESS } from '../constants/userConstants';

export const addGroup = (newGroup) => async (dispatch, getState) => {
    dispatch({ type: MY_GROUPS_REQUEST })

    try {
        const { id, role } = getState().userInfo.userInfo
        let myGroups = getState().myGroupsState.myGroups || []
        const existGroup = myGroups.find(x => x.teacherId === newGroup.teacherId && x.subject?.id === newGroup.subject?.id)
        if (existGroup) {
            myGroups = myGroups.filter(x => x.id !== existGroup.id)
        }
        myGroups = [...myGroups, newGroup];
        const serverGroups = myGroups.map(x => ({ id: x.id, teacherId: x.teacherId, }))
        const { data: student } = await Axios.put(ADD_GROUP_URL, { id, role, myGroups: serverGroups })
        if (!student) return
        const userInfo = modifyStudent(student, years, schoolTypes)
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups })
        dispatch({ type: USER_SUCCESS, payload: userInfo });
        await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log('group added successfully.');
    } catch (error) {
        console.log("🚀 ~ file: groupsActions.js:25 ~ addGroup ~ error:", error)
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
        myGroups = myGroups.filter(x => !(x.id === groupId && x.teacherId === teacherId));
        const serverGroups = myGroups.map(x => ({ id: x.id, teacherId: x.teacherId, }))
        const { data: student } = await Axios.put(ADD_GROUP_URL, { id, role, myGroups: serverGroups })
        if (!student) return
        const userInfo = modifyStudent(student, years, schoolTypes)
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups })
        dispatch({ type: USER_SUCCESS, payload: userInfo });
        await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log('group removed successfully.');
    } catch (error) {
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


export const setMyGroups = (id) => async (dispatch) => {
    dispatch({ type: MY_GROUPS_REQUEST })/*  */
    try {
        const { data } = await Axios.get(MY_GROUPS_URL + id)
        if (!data) return
        const myGroups = modifyGroups(data, subjects, years)
        await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups })
    } catch (error) {
        console.log("🚀 ~ file: groupsActions.js:66 ~ setMyGroups ~ error:", error)
        dispatch({
            type: MY_GROUPS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}