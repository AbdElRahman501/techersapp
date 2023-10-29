import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackHeader from '../components/BackHeader';
import { useSelector } from 'react-redux';
import { days, months, teachers } from '../data';
import CustomDropdown from '../components/CustomDropdown';
import TeacherItem from '../components/TeacherItem';
import t from '../actions/changeLanguage';
import { Color } from '../GlobalStyles';
import SlideContainer from '../components/SlideContainer';
import ContainerTitle from '../components/ContainerTitle';
import DayItem from '../components/DayItem';
import MonthItem from '../components/MonthItem';
import { findMyTeachers } from '../actions/GlobalFunctions';



export default function SubjectScreen({ route }) {
    const { item } = route.params;
    const { language } = useSelector(state => state.languageState)
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const [subjectTeachers, setSubjectTeachers] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    const handleSelect = option => {
        setSelectedOption(option);
    };

    const revDays = days.slice().reverse();
    const revMonths = months.slice().reverse();

    useEffect(() => {
        if (userInfo) {
            const myT = findMyTeachers(teachers, userInfo.myTeachers)
            const theTeachers = myT.filter(x => {
                const teacherSubjects = x.groups.map(y => y.subject.id)
                return teacherSubjects.includes(item.id)
            })
            setSubjectTeachers(theTeachers);
            setSelectedOption(theTeachers[0])
        }
    }, [userInfo])

    const [attendance, homework, payment, exams] = [t("attendance"), t("homework"), t("payment"), t("exams")]

    return selectedOption && (
        <SafeAreaView style={[styles.container]} >
            <BackHeader title={item[language]} />
            <CustomDropdown subject={item} data={subjectTeachers} selectedItem={selectedOption} onSelect={handleSelect} height={250}  >
                <TeacherItem />
            </CustomDropdown>
            <ScrollView style={{ flex: 1 }} >
                <View style={[styles.appContainer]}>
                    <ContainerTitle title={attendance} />
                    <SlideContainer data={revDays}  >
                        <DayItem />
                    </SlideContainer>
                    <ContainerTitle title={homework} />
                    <SlideContainer data={revDays}  >
                        <DayItem />
                    </SlideContainer>
                    <ContainerTitle title={payment} />
                    <SlideContainer data={revMonths}  >
                        <MonthItem />
                    </SlideContainer>
                    <ContainerTitle title={exams} />
                    <SlideContainer data={revMonths}  >
                        <MonthItem />
                    </SlideContainer>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white,
        flex: 1,
    },
    appContainer: {
        backgroundColor: Color.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    }


})