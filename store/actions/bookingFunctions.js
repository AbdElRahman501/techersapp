import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_FAIL, USER_SUCCESS } from "../constants/userConstants";

export const addTeacher = (serverTeacher, teacher, selectedGroup) => async (dispatch) => {
    try {
        const dataJSON = await AsyncStorage.getItem("userInfo");
        const myTeachersJSON = await AsyncStorage.getItem("myTeachers");

        let userData = JSON.parse(dataJSON);
        let myTeachers = JSON.parse(myTeachersJSON);
        console.log("🚀 ~ file: bookingFunctions.js:11 ~ addTeacher ~ myTeachers:", myTeachers?.length)

        if (userData) {
            if (!userData.myTeachers) {
                userData = { ...userData, myTeachers: [] }
            }
            let Teachers = userData.myTeachers.filter(x => x.id !== serverTeacher.id)
            userData = { ...userData, myTeachers: [...Teachers, serverTeacher] }
            await AsyncStorage.setItem("userInfo", JSON.stringify(userData));

            let newTeacher = {
                id: teacher.id,
                imageSource: teacher.imageSource,
                name: teacher.name,
                mainSubject: teacher.mainSubject,
                bookingLimits: teacher.bookingLimits,
                studyingYear: teacher.studyingYear,
                midYearHoliday: teacher.midYearHoliday,
                group: selectedGroup
            }
            if (myTeachers) {
                myTeachers = myTeachers.filter(x => x.id !== newTeacher.id)
                myTeachers = [...myTeachers, newTeacher]
            } else {
                myTeachers = [newTeacher]
            }

            await AsyncStorage.setItem("myTeachers", JSON.stringify(myTeachers));
            console.log('teacher saved successfully.');
            dispatch({ type: USER_SUCCESS, payload: userData });
        }
    } catch (error) {
        console.log('Error saving data:', error);
        dispatch({ type: USER_FAIL, payload: error });
    }
};
