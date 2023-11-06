import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MY_GROUPS_REQUEST, MY_GROUPS_SUCCESS, MY_GROUPS_FAIL } from '../constants/groupsConstants';
import { ADD_GROUP_URL } from './api';


export const addGroup = (newGroup) => async (dispatch, getState) => {
    dispatch({ type: MY_GROUPS_REQUEST })
    const { id, role } = getState().userInfo.userInfo
    let myGroups = getState().myGroupsState.myGroups || []
    const existGroup = myGroups.find(x => x.teacherId === newGroup.teacherId && x.subject?.id === newGroup.subject?.id)
    if (existGroup) {
        myGroups = myGroups.filter(x => x.id !== existGroup.id)
    }
    myGroups = [...myGroups, newGroup];
    const serverGroups = myGroups.map(x => ({ id: x.id, teacherId: x.teacherId, }))
    try {
        const { data } = await Axios.put(ADD_GROUP_URL, { id, role, myGroups: serverGroups })
        if (!data) return
        await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups })
    } catch (error) {
        console.log('Error saving data:', error)
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
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups })
    } catch (error) {
        console.log('Error saving data:', error)
        dispatch({
            type: MY_GROUPS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}