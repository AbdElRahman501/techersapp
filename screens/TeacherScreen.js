import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackHeader from '../components/BackHeader';
import { days, friends } from '../data';
import t from '../actions/changeLanguage';
import { Color, FontFamily, FontSize, Margin, Padding, globalStyles, widthPercentage } from '../GlobalStyles';
import SlideContainer from '../components/SlideContainer';
import ContainerTitle from '../components/ContainerTitle';
import TeacherMainCard from '../components/TeacherMainCard';
import Analytics from '../components/Analytics';
import DayOption from '../components/DayOption';
import HoursOption from '../components/HoursOption';
import FriendItem from '../components/FriendItem';
import { calculateEndTime, equalArs, getTextInputAlign, transformTime } from '../actions/GlobalFunctions';
import LongText from '../components/LongText';
import PrimaryButton from '../components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "../store/actions/showMessageActions";

export default function TeacherScreen({ route }) {
    const { item } = route.params;
    const { loading, userInfo, error } = useSelector(state => state.userInfo);

    const [selectedGroup, setSelectedGroup] = useState();

    const [selectedDay, setSelectedDay] = useState();
    const [selectedHour, setSelectedHour] = useState("00:00");
    const [selectedSubject, setSelectedSubject] = useState()

    const [hours, setHours] = useState([]);
    const [mySchedules, setMySchedules] = useState([])
    const [myBookedHours, setMyBookedHours] = useState([])


    let [bookSeat, changeDate, bookedSeat, chooseDay, chooseHour, and] =
        [t("book your seat"), t("change date"), t("your seat is booked"), t("choose day"), t("choose hour"), t("and")];
    const [buttonText, setButtonText] = useState({ text: bookSeat, role: "book" })

    const dayHandelPress = (fullName) => {
        setSelectedDay(fullName)
        let isTheSameGroup = selectedGroup?.days.map(y => y.day).includes(fullName)
        if (!isTheSameGroup) {
            setSelectedGroup()
            setSelectedHour("00:00")
        } else if (selectedGroup) {
            setSelectedHour(selectedGroup.days.find(x => x.day === fullName).timeIn24Format)
        }
        setHours(getHours(fullName, selectedSubject))
    }

    const availableGroups = (dayName, subject) => {
        let availableGroups = item.groups.filter(x => x.subject.id === subject.id && x.schoolYear.id === userInfo.schoolYear.id)
        availableGroups = availableGroups.filter(x => x.days.map(y => y.day).includes(dayName))
        return availableGroups
    }
    const hoursHandelPress = (hour) => {
        let myGroup = item.groups.find(x => x.id === hour.groupId)
        updateGroup(myGroup)
    }

    useEffect(() => {
        if (userInfo) {
            let myGroupId = userInfo?.myTeachers?.find(x => x.id === item.id)?.groupId
            let myGroup = item.groups.find(x => x.id === myGroupId)
            if (myGroup) {
                updateGroup(myGroup)
            }
        }
    }, [userInfo])


    const updateGroup = (group) => {
        if (group) {
            let theSelectedDay = selectedDay || group.days.map(x => x.day)[0]
            setSelectedGroup(group)
            setSelectedSubject(group.subject)
            setSelectedDay(theSelectedDay)
            setHours(getHours(theSelectedDay, group.subject))
            setSelectedHour(group.days.find(x => x.day === theSelectedDay).timeIn24Format)
        }
    }

    const getHours = (day, subject) => {
        let avGroups = availableGroups(day, subject) || []
        let avHours = avGroups.map(x => x.days.map(y => ({ ...y, groupId: x.id }))).flat().filter(x => x.day === day)
        return avHours
    }
    const changeSubjectHandler = (subject) => {
        // setSelectedSubject(subject)
        // let teacherSchedules = (subject.schoolYears.find(x => x.id === userInfo.schoolYear.id)?.schedule.male.times)
        // setSelectedDay([])
        // setHours([])
        // setSelectedHour("00:00")
        // setMySchedules(teacherSchedules)
    }

    // useEffect(() => {
    //     if (userInfo) {
    //         let myItem = userInfo?.myTeachers?.find(x => x.id === item.id)
    //         if (myItem && selectedHour !== "00:00" && selectedDay.length > 0 && selectedSubject) {
    //             if ((selectedSubject.id === myItem?.subject.id)) {
    //                 if ((!equalArs(selectedDay, myItem?.schedule.days)) || (selectedHour !== myItem?.schedule.hours.timeIn24Format)) {
    //                     setButtonText({ text: changeDate, role: "change" })
    //                 } else {
    //                     setButtonText({ text: bookedSeat, role: "booked" })
    //                 }
    //             } else {
    //                 setButtonText({ text: bookSeat, role: "book" })
    //             }
    //         } else {
    //             if (selectedDay.length === 0) {
    //                 setButtonText({ text: chooseDay, role: "choose day" })
    //             } else if (selectedHour === "00:00") {
    //                 setButtonText({ text: chooseHour, role: "choose hour" })
    //             } else {
    //                 setButtonText({ text: bookSeat, role: "book" })
    //             }
    //         }
    //     }
    // }, [selectedHour, selectedSubject, selectedDay])


    // useEffect(() => {
    //     if (userInfo && selectedDay.length > 0) {

    //         let mySubject = userInfo.myTeachers?.find(x => x.id === item.id)?.subject

    //         if (mySubject?.id === selectedSubject.id) {
    //             let myBookedDates = userInfo.myTeachers?.filter(x => x.id !== item.id).filter(x => x.schedule.days[0] === selectedDay[0]).map(x => {
    //                 return { ...x.schedule, id: x.id }
    //             })
    //             let myBookedHours = myBookedDates.map(x => {
    //                 return { timeIn24Format: x.hours.timeIn24Format, days: x.days, duration: x.hours.duration, teacherId: x.id }
    //             })
    //             setMyBookedHours(myBookedHours)
    //         } else {
    //             let myBookedDates = userInfo.myTeachers?.filter(x => x.schedule.days.includes(selectedDay[0])).map(x => {
    //                 return { ...x.schedule, id: x.id }
    //             })
    //             let myBookedHours = myBookedDates.map(x => {
    //                 return { timeIn24Format: x.hours.timeIn24Format, days: x.days, duration: x.hours.duration, teacherId: x.id }
    //             })
    //             setMyBookedHours(myBookedHours)
    //         }
    //     }

    // }, [userInfo, selectedDay, selectedSubject])


    // const dispatch = useDispatch();
    // const { language } = useSelector((state) => state.languageState);
    const showMessageHandler = () => {
        //     if (selectedDay.length > 0 && selectedHour !== "00:00") {
        //         let theDays = days.filter(x => selectedDay.includes(x.fullName)).map(x => x.day[language]).join(" " + and + " ")
        //         let hours = transformTime(selectedHour, language)
        //         dispatch(showMessage(language === "en" ? `You have been booked on ${theDays} at ${hours}` : `تم تحجز مقعدك في يوم ${theDays} الساعة ${hours}`));
        //     }
    }
    return (
        <SafeAreaView style={[styles.container]} >
            <BackHeader title={t("teacher page")} />
            <ScrollView style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <TeacherMainCard userInfo={userInfo} item={item} selectedSubject={selectedSubject} changeSubjectHandler={changeSubjectHandler} />
                <View style={[styles.appContainer]}>
                    <ContainerTitle title={t("about teacher")} />
                    <LongText content={item.about} style={[styles.regular, { textAlign: getTextInputAlign(item.about) }]} />
                    {/* <ContainerTitle title={t("Analytics")} pressedTitle={t("know more")} pressHandler={() => console.log("all")} />
                    <Analytics item={item} /> */}
                    <ContainerTitle title={t("schedule")} pressedTitle={t("know more")} pressHandler={() => console.log("all")} />
                    <SlideContainer data={days} selectedGroup={selectedGroup} selectedDay={selectedDay} handelPress={dayHandelPress}   >
                        <DayOption />
                    </SlideContainer>
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>
                    {hours.length > 0 &&
                        <SlideContainer myBookedHours={myBookedHours} data={hours} selectedHour={selectedHour} handelPress={hoursHandelPress}   >
                            <HoursOption />
                        </SlideContainer>
                    }
                     <ContainerTitle title={t("colleagues")} />
                    <SlideContainer data={friends} scrollAnimation={true}  >
                        <FriendItem teacher={item} />
                    </SlideContainer>
                </View>
            </ScrollView>
            <View style={[styles.buttonContainer]}>
                <View style={{ paddingHorizontal: Padding.p_sm }} >
                    <Text style={[styles.regular]}>
                        {t("per month")}
                    </Text>
                    <Text style={[styles.title]}>
                        EL {item.price}
                    </Text>
                </View>
                <PrimaryButton style={{ width: "65%" }} onPress={showMessageHandler} disabled={!selectedDay || selectedHour === "00:00" || buttonText.role === "booked"} >
                    <Text style={styles.buttonText}>{buttonText.text}</Text>
                </PrimaryButton>
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
        paddingBottom: Padding.page_p
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: Padding.page_p,
        backgroundColor: Color.white,
        borderWidth: 1,
        borderColor: Color.lightGray,
        borderTopRightRadius: 52,
        borderTopLeftRadius: 52,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        elevation: 24,
    },
    title: {
        fontSize: FontSize.size_xl,
        fontWeight: 'bold',
    }

})

