import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackHeader from '../components/BackHeader';
import { useSelector } from 'react-redux';
import t from '../actions/changeLanguage';
import { Color, globalStyles } from '../GlobalStyles';
import TeacherMainCard from '../components/TeacherMainCard';
import Calender from '../components/Calender';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import DividerWithText from '../components/DividerWithText ';
import { getTheMonths } from '../actions/GlobalFunctions';
import StateCard from '../components/StateCard';
import MonthStateCard from '../components/MonthStateCard';
import { items, monthItems } from '../data';

export default function SubjectScreen({ route }) {
    const { item } = route.params;
    const [resultsOf] = [t('results of the month')]
    const navigation = useNavigation();
    const navigationState = useNavigationState(state => state);
    const { today, currentMonth } = getTheMonths()

    const { language } = useSelector(state => state.languageState)
    const { myGroups } = useSelector(state => state.myGroupsState);
    const { myTeachers } = useSelector(state => state.myTeachersState);

    const teachersGroups = myGroups.length > 0 ? myGroups.filter(x => x.subject === item.en) : []
    const teachers = myTeachers.length > 0 ? myTeachers.filter(x => teachersGroups.map(y => y.teacherId).includes(x.id)) : []
    const selectedTeacher = teachers[0]
    const selectedGroup = teachersGroups.find(x => x.teacherId === selectedTeacher.id)


    const [selectedDay, setSelectedDay] = useState(today)
    const [selectedMonth, setSelectedMonth] = useState(currentMonth)
    const [selectedState, setSelectedState] = useState("")


    useEffect(() => {
        if (!selectedTeacher) {
            const theHistory = navigationState.routes.map(route => route.name)
            const currentRoute = theHistory[theHistory.length - 1]
            if (currentRoute === "SubjectScreen") {
                navigation.replace("SearchScreen", { subject: item })
            }
        }
    }, [selectedTeacher, navigationState])

    return selectedTeacher && (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
            <BackHeader title={item[language]} />
            <TeacherMainCard item={selectedTeacher} group={selectedGroup} pressHandler={(item) => navigation.navigate("TeacherScreen", { item })} />
            <Calender selectedDay={selectedDay} setSelectedDay={setSelectedDay} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            <ScrollView style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ width: "100%", marginTop: 10, flexDirection: language === 'en' ? "row" : "row-reverse", justifyContent: "space-between" }}>
                    {monthItems.map((item, index) => <MonthStateCard item={item} key={index} handlePress={(item) => setSelectedState(pv => item.type === pv.type ? "" : item)} selectedState={selectedState} />)}
                </View>
                <DividerWithText >
                    <Text style={[globalStyles.title, { color: Color.darkcyan, marginHorizontal: 5 }]}>{resultsOf + selectedMonth[language]}</Text>
                </DividerWithText>
                {items.map((item, index) => <StateCard item={item} key={index} />)}
            </ScrollView>
        </SafeAreaView >
    )
}