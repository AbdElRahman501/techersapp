import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
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



export default function SubjectScreen({ route }) {
    const { language } = useSelector(state => state.languageState)
    const { item } = route.params;
    const [selectedOption, setSelectedOption] = useState(teachers[0]);

    const handleSelect = option => {
        setSelectedOption(option);
        console.log('Selected:', option);
    };

    const revDays = days.slice().reverse();
    const revMonths = months.slice().reverse(); 
    return (
        <SafeAreaView style={[styles.container]} >
            <BackHeader title={item.title[language]} />
            <CustomDropdown data={teachers} selectedItem={selectedOption} onSelect={handleSelect} height={250}  >
                <TeacherItem />
            </CustomDropdown>
            <ScrollView style={{ flex: 1 }} >
                <View style={[styles.appContainer]}>
                    <ContainerTitle title={"الحضور"} />
                    <SlideContainer data={revDays}  >
                        <DayItem />
                    </SlideContainer>
                    <ContainerTitle title={"الواجبات"} />
                    <SlideContainer data={revDays}  >
                        <DayItem />
                    </SlideContainer>
                    <ContainerTitle title={"مصارف"} />
                    <SlideContainer data={revMonths}  >
                        <MonthItem />
                    </SlideContainer>
                    <ContainerTitle title={"الامتحانات"} />
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