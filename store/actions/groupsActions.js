import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MY_GROUPS_REQUEST, MY_GROUPS_SUCCESS, MY_GROUPS_FAIL } from '../constants/groupsConstants';
import { ADD_GROUP_URL } from './api';


export const addGroup = (newGroup) => async (dispatch, getState) => {
    dispatch({ type: MY_GROUPS_REQUEST })
    let myGroups = getState().myGroupsState.myGroups || []
    const existGroup = myGroups.find(x => x.teacherId === newGroup.teacherId && x.subject?.id === newGroup.subject?.id)
    if (existGroup) {
        myGroups = myGroups.filter(x => x.id !== existGroup.id)
    }
    myGroups = [...myGroups, newGroup];
    try {
        // const { data } = await Axios.post(ADD_GROUP_URL, newGroup)
        // if (!data) return
        // await AsyncStorage.setItem("myGroups", JSON.stringify(myGroups));
        dispatch({ type: MY_GROUPS_SUCCESS, payload: myGroups })
    } catch (error) {
        console.log('Error saving data:', error)
        dispatch({ type: MY_GROUPS_FAIL, payload: error })
    }
}