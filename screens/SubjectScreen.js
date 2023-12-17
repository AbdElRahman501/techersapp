import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackHeader from '../components/BackHeader';
import { useSelector } from 'react-redux';
import t from '../actions/changeLanguage';
import { Color, globalStyles, heightPercentage } from '../GlobalStyles';
import TeacherMainCard from '../components/TeacherMainCard';
import Calender from '../components/Calender';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import DividerWithText from '../components/DividerWithText ';
import { getTheMonths, removeDuplicatesById, sortByDate, sortByName, typeCalculator } from '../actions/GlobalFunctions';
import StateCard from '../components/StateCard';
import MonthStateCard from '../components/MonthStateCard';
import { events } from '../data';

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


    const [selectedDay, setSelectedDay] = useState("")
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
  
    const handlePress = (item) => {
        setSelectedDay("")
        setSelectedState(pv => item.type === pv.type ? "" : item)
    }
    return selectedTeacher && (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
            <BackHeader title={item[language]} />
            <ScrollView style={{ flex: 1 }}
                nestedScrollEnabled={true}
                contentContainerStyle={{ height: heightPercentage(100) + 130 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ marginBottom: 10 }}>
                    <TeacherMainCard item={selectedTeacher} group={selectedGroup} pressHandler={(item) => navigation.navigate("TeacherScreen", { item })} />
                </View>
                <Calender selectedDay={selectedDay} setSelectedDay={(day) => { setSelectedState(""); setSelectedDay(pv => pv.id === day.id ? "" : day) }} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} events={events} />
                <DividerWithText >
                    <Text style={[globalStyles.title, { color: Color.darkcyan, marginHorizontal: 5 }]}>{resultsOf + selectedMonth[language]}</Text>
                </DividerWithText>
                <View style={{ width: "100%", paddingHorizontal: 20, paddingBottom: 10, flexDirection: language === 'en' ? "row" : "row-reverse", justifyContent: "space-between" }}>
                    <MonthStateCard item={typeCalculator(events, "attendance", "attend")} handlePress={handlePress} selectedState={selectedState} />
                    <MonthStateCard item={typeCalculator(events, "attendance", "absent")} handlePress={handlePress} selectedState={selectedState} />
                    <MonthStateCard item={typeCalculator(events, "attendance", "late")} handlePress={handlePress} selectedState={selectedState} />
                    <MonthStateCard item={typeCalculator(events, "exams")} handlePress={handlePress} selectedState={selectedState} />
                    <MonthStateCard item={typeCalculator(events, "homework")} handlePress={handlePress} selectedState={selectedState} />
                    <MonthStateCard item={typeCalculator(events, "payment", "done")} handlePress={handlePress} selectedState={selectedState} />
                </View>
                <ScrollView style={{ flex: 1 }}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {/* {events.map((item, index) => <StateCard item={item} key={index} />)} */}
                    {sortByDate(removeDuplicatesById(events), 'id').reverse().filter(x => selectedDay ? x.id === selectedDay?.id : true).map((item, i) => {
                        const filteredEvents = events.filter(x => x.id === item.id).filter(x => selectedState ? (x.type === selectedState.type || (x.state && x.state === selectedState.state)) : true)
                        return <View key={i} >
                            {filteredEvents.length > 0 && <Text style={[globalStyles.contentText, { marginTop: 10 }]}> {item.id} </Text>}
                            {sortByName(filteredEvents, "type").map((event, index) =>
                                <StateCard item={event} key={index} />
                            )}
                        </View>
                    }
                    )}
                </ScrollView>
            </ScrollView>
        </SafeAreaView >
    )
}
