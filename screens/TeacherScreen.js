import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackHeader from '../components/BackHeader';
import { days, friends } from '../data';
import t from '../actions/changeLanguage';
import { Color, FontFamily, FontSize, Margin, Padding } from '../GlobalStyles';
import SlideContainer from '../components/SlideContainer';
import ContainerTitle from '../components/ContainerTitle';
import TeacherMainCard from '../components/TeacherMainCard';
import Analytics from '../components/Analytics';
import DayOption from '../components/DayOption';
import HoursOption from '../components/HoursOption';
import FriendItem from '../components/FriendItem';
import { getTextInputAlign } from '../actions/GlobalFunctions';
import LongText from '../components/LongText';
import PrimaryButton from '../components/PrimaryButton';
import { useSelector } from 'react-redux';

export default function TeacherScreen({ route }) {
    const { item } = route.params;
    const [selectedDay, setSelectedDay] = useState([]);
    const [hours, setHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState("00:00");
    const [selectedSubject, setSelectedSubject] = useState()
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const [mySchedules, setMySchedules] = useState([])
    let [bookSeat, changeDate, bookedSeat] = [t("book your seat"), t("change date"), t("your seat is booked")]
    const [buttonText, setButtonText] = useState(bookSeat)
    const dayHandelPress = (fullName, teacherSchedules) => {
        let schedule = teacherSchedules || mySchedules
        if (schedule) {
            let times = schedule.find(x => {
                if (x.days.includes(fullName)) {
                    return x.days
                }
            })
            setSelectedHour("00:00")
            setHours(times?.hours.map((x, i) => ({ ...x, id: i + 1 })) || [])
            setSelectedDay(times?.days || fullName)
        }
    }
    useEffect(() => {
        if (typeof selectedDay === "string") {
            dayHandelPress(selectedDay)
        }
    }, [selectedDay])

    const hoursHandelPress = (id) => {
        setSelectedHour(id)
    }

    const isInMyTeachers = (myTeachers, item) => {
        return myTeachers.find(x => x.id === item.id)
    }

    useEffect(() => {
        if (userInfo) {
            let myItem = isInMyTeachers(userInfo?.myTeachers || [], item)
            let mySubject = item.subjects.find((subject, i) => {
                let subjectSchedule = subject.schoolYears.find(x => x.id === userInfo?.schoolYear.id)
                if (myItem?.subject.id === subject.id) {
                    return subject
                } else if (subjectSchedule) {
                    return subject
                }
            })
            setSelectedSubject(mySubject)
            let teacherSchedules = (mySubject.schoolYears.find(x => x.id === userInfo.schoolYear.id)?.schedule.male.times)
            setMySchedules(teacherSchedules)
            if (myItem) {
                dayHandelPress(myItem.schedule.days[0], teacherSchedules)
                setSelectedHour(myItem.schedule.hours.timeIn24Format)
            }
        }
    }, [userInfo])

    useEffect(() => {
        if (userInfo) {
            let myItem = isInMyTeachers(userInfo?.myTeachers || [], item)
            if (myItem && selectedHour !== "00:00" && selectedDay.length > 0 && selectedSubject) {
                if ((selectedSubject.id !== myItem?.subject.id) || (selectedDay[0] !== myItem?.schedule.days[0]) || (selectedHour !== myItem?.schedule.hours.timeIn24Format)) {
                    setButtonText(changeDate)
                } else {
                    setButtonText(bookedSeat)
                }
            }
        }
    }, [selectedHour, selectedSubject, selectedDay, selectedHour])
    return (
        <SafeAreaView style={[styles.container]} >
            <BackHeader title={t("teacher page")} />
            <ScrollView style={{ flex: 1 }}
                showsVerticalScrollIndicator={false} // Hide vertical scroll bar
                showsHorizontalScrollIndicator={false} // Hide horizontal scroll bar
            >
                <TeacherMainCard userInfo={userInfo} item={item} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} />
                <View style={[styles.appContainer]}>
                    <ContainerTitle title={t("about teacher")} />
                    <LongText content={item.about} style={[styles.regular, { textAlign: getTextInputAlign(item.about) }]} />
                    <ContainerTitle title={t("Analytics")} pressedTitle={t("know more")} pressHandler={() => console.log("all")} />
                    <Analytics item={item} />
                    <ContainerTitle title={t("schedule")} pressedTitle={t("know more")} pressHandler={() => console.log("all")} />
                    <SlideContainer select={true} SelectedId={selectedDay} handelPress={dayHandelPress} data={days}  >
                        <DayOption />
                    </SlideContainer>
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>
                    {hours.length > 0 &&
                        <SlideContainer disabled={selectedDay === 0} select={true} SelectedId={selectedHour} handelPress={hoursHandelPress} data={hours}  >
                            <HoursOption />
                        </SlideContainer>
                    }
                    <ContainerTitle title={t("colleagues")} />
                    <SlideContainer data={friends} scrollAnimation={true}  >
                        <FriendItem teacher={item} />
                    </SlideContainer>
                </View>
            </ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: Padding.page_p }}>
                <View style={{ paddingHorizontal: Padding.p_sm }} >
                    <Text style={[styles.regular]}>
                        {t("per month")}
                    </Text>
                    <Text style={[styles.title]}>
                        EL {item.price}
                    </Text>
                </View>
                <PrimaryButton style={{ width: "65%" }} pressHandler={() => console.log("book")} disabled={selectedDay.length === 0 || selectedHour === "00:00"} >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </PrimaryButton>
                {/* title, pressHandler, leftIcon, rightIcon, disabled, btnColor, customStyles */}
            </View>
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
        paddingHorizontal: Padding.page_p,
    },
    regular: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_base,
        color: Color.darkgray
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Margin.m_base,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Color.lightGray,
    },
    buttonText: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_lg,
        color: Color.white
    },
    title: {
        fontSize: FontSize.size_xl,
        fontWeight: 'bold',
    },
})
