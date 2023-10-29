import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackHeader from '../components/BackHeader';
import { days, friends, teachers } from '../data';
import t from '../actions/changeLanguage';
import { Color, FontFamily, FontSize, Margin, Padding, globalStyles, widthPercentage } from '../GlobalStyles';
import SlideContainer from '../components/SlideContainer';
import ContainerTitle from '../components/ContainerTitle';
import TeacherMainCard from '../components/TeacherMainCard';
import Analytics from '../components/Analytics';
import DayOption from '../components/DayOption';
import HoursOption from '../components/HoursOption';
import FriendItem from '../components/FriendItem';
import { areAppointmentsOverlapping, calculateEndTime, equalArs, getBookedMessage, getEvents, getMyGroups, getTextInputAlign, removeDuplicatesById, sortArrayByTime, transformTime } from '../actions/GlobalFunctions';
import LongText from '../components/LongText';
import PrimaryButton from '../components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "../store/actions/showMessageActions";
import { addTeacher, leaveTeacher } from '../store/actions/bookingFunctions';
import AlertModal from '../components/alertModal';
import LoadingModal from '../components/LoadingModal';

export default function TeacherScreen({ route }) {
    const { item } = route.params;
    const { loading, userInfo, error } = useSelector(state => state.userInfo);

    const [selectedGroup, setSelectedGroup] = useState();

    const [selectedDay, setSelectedDay] = useState();
    const [selectedHour, setSelectedHour] = useState("00:00");
    const [selectedSubject, setSelectedSubject] = useState()
    const [hours, setHours] = useState([]);
    const [myGroups, setMyGroups] = useState([])


    let [bookSeat, changeDate, leave, chooseDay, chooseHour, noGroupAvailable, and] =
        [t("book your seat"), t("change date"), t("leave"), t("choose day"), t("choose hour"), t("no group available"), t("and")];
    const [buttonText, setButtonText] = useState({ text: bookSeat })

    // press handler 
    const dayHandelPress = (fullName) => {
        setSelectedDay(fullName)
        let isTheSameGroup = selectedGroup?.days.map(y => y.day).includes(fullName)
        if (!isTheSameGroup) {
            setSelectedGroup()
            setSelectedHour("00:00")
        } else if (selectedGroup) {
            setSelectedHour(selectedGroup.days.find(x => x.day === fullName).timeIn24Format)
        }
        setHours(getHours(fullName, selectedSubject, selectedGroup))
    }
    const hoursHandelPress = (hour) => {
        let myGroup = item.groups.find(x => x.id === hour.groupId)
        if (hour.day !== selectedDay) {
            setSelectedDay(hour.day)
        }
        updateGroup(myGroup, hour.day)
    }
    const changeSubjectHandler = (subject) => {
        setSelectedSubject(subject)
        init(userInfo, subject)
    }


    // functions 
    const availableGroups = (dayName, subject) => {
        let availableGroups = item.groups.filter(x => x.subject.id === subject.id && x.schoolYear.id === userInfo.schoolYear.id)
        availableGroups = availableGroups?.filter(x => x.days.map(y => y.day).includes(dayName))
        return availableGroups
    }

    const updateGroup = (group, day, subject) => {
        if (group) {
            let theSelectedDay = day || group.days.map(x => x.day)[0]
            setSelectedGroup(group)
            setSelectedSubject(group.subject)
            setSelectedDay(theSelectedDay)
            setHours(getHours(theSelectedDay, group.subject, group))
            setSelectedHour(group.days.find(x => x.day === theSelectedDay).timeIn24Format)
        } else {
            setSelectedGroup()
            setSelectedSubject(subject || removeDuplicatesById(item.groups.map(x => x.subject))[0])
            setSelectedHour("00:00")
            setSelectedDay()
            setHours([])
        }
    }

    const getHours = (day, subject, group) => {
        let avGroups = availableGroups(day, subject) || []
        let avHours = avGroups.map(x => x.days.map(y => ({ ...y, groupId: x.id }))).flat()
        let primaryTimes = avHours.filter(x => x.day === day)
        let secondaryTime = avHours.find(x => x.groupId === group?.id && x.day !== day)
        secondaryTime = secondaryTime && { ...avHours.find(x => x.groupId === group?.id && x.day !== day), secondary: true }
        let isDuplicate = primaryTimes?.map(x => x.timeIn24Format).includes(secondaryTime?.timeIn24Format)
        if (secondaryTime && !isDuplicate) {
            return [...avHours.filter(x => x.day === day), secondaryTime]
        } else {
            return avHours.filter(x => x.day === day)
        }
    }

    const init = (userInfo, subject) => {
        let myGroupsId = userInfo?.myTeachers?.find(x => x.id === item.id)?.groupsId
        let availableGroups
        if (subject) {
            availableGroups = item.groups.filter(x => x.subject.id === subject.id && x.schoolYear.id === userInfo.schoolYear.id)
        } else {
            availableGroups = item.groups
        }
        let myGroup = availableGroups.find(x => myGroupsId?.includes(x.id))
        if (myGroup) {
            updateGroup(myGroup)
        } else {
            updateGroup(null, null, subject)
        }
    }


    useEffect(() => {
        if (userInfo) {
            init(userInfo)
            let myTeachers = userInfo.myTeachers?.filter(x => x.id !== item.id)
            setMyGroups(getMyGroups(myTeachers, teachers))
        }
    }, [userInfo])

    // button message
    useEffect(() => {
        setButtonText(getButtonText())

    }, [selectedGroup, selectedDay, userInfo])

    const getButtonText = () => {
        if (!selectedDay) {
            return ({ text: chooseDay })
        } else if (hours.length > 0 && selectedHour === "00:00") {
            return ({ text: chooseHour })
        } else if (hours.length === 0) {
            return ({ text: noGroupAvailable, notAvailable: true })
        } else if (selectedGroup) {
            let myGroupsId = userInfo?.myTeachers?.find(x => x.id === item.id)?.groupsId
            if (myGroupsId?.includes(selectedGroup.id)) {
                return ({ text: leave, booked: true })
            } else if (myGroupsId && !myGroupsId?.includes(selectedGroup.id)) {
                return ({ text: changeDate })
            } else {
                return ({ text: bookSeat })
            }
        }
    }

    // submit handler
    const dispatch = useDispatch();
    const { language } = useSelector((state) => state.languageState);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("")

    const [confirm, cancel, leaveMessage, confirmMessage] = [t("confirm"), t("cancel"), t("leave message"), t("confirm message")];

    const bookTeacher = () => {
        if (selectedGroup) {
            if (buttonText.booked) {
                dispatch(leaveTeacher(item.id))
            } else {
                const groupsID = userInfo?.myTeachers?.find(x => x.id === item.id)?.groupsId
                let prevGroups = item.groups.filter(x => groupsID?.includes(x.id))
                prevGroups = prevGroups.filter(x => x.subject.id !== selectedGroup.subject.id)?.map(x => x.id)
                dispatch(addTeacher({ id: item.id, groupsId: [...prevGroups, selectedGroup.id], favorite: false }, item, selectedGroup))
            }
        }
    }
    const showPopup = () => {
        if (selectedGroup) {
            if (buttonText.booked) {
                setMessage(leaveMessage)
                setVisible(true)
            } else {
                let message = getBookedMessage(selectedGroup, language)
                setMessage(confirmMessage + message)
                setVisible(true)
            }
        }
    }

    return (
        <SafeAreaView style={[styles.container]} >
            <BackHeader title={t("teacher page")} />
            <LoadingModal visible={loading} />
            <AlertModal
                visible={visible || loading}
                imageSource={require('../assets/icons/alert.png')}
                title={confirm}
                content={message}
                primaryButton={confirm}
                secondaryButton={cancel}
                primaryButtonSubmit={() => { setVisible(false); bookTeacher() }}
                secondaryButtonSubmit={() => setVisible(false)}
            />
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
                    <SlideContainer data={sortArrayByTime(hours)} myGroups={myGroups} teacher={item} selectedGroup={selectedGroup} selectedHour={selectedHour} handelPress={hoursHandelPress}   >
                        <HoursOption />
                    </SlideContainer>
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
                <PrimaryButton
                    style={{
                        width: "65%", backgroundColor:
                            buttonText.booked ?
                                Color.red :
                                buttonText.notAvailable ? Color.darkgray : Color.darkcyan
                    }}
                    onPress={showPopup}
                    disabled={!selectedDay || selectedHour === "00:00"} >
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

