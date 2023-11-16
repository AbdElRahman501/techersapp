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
import { getBookedMessage, getColor, getTextInputAlign, sortArrayByTime } from '../actions/GlobalFunctions';
import LongText from '../components/LongText';
import PrimaryButton from '../components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from '../components/alertModal';
import LoadingModal from '../components/LoadingModal';
import { getTeacherInfo } from '../store/actions/teachersActions';
import { addGroup, leaveGroup } from '../store/actions/groupsActions';
import NetInfo from '@react-native-community/netinfo';
import NetworkPage from '../components/NetworkPage';

export default function TeacherScreen({ route }) {
    const { item, subject } = route.params;
    const dispatch = useDispatch();
    let [bookSeat, changeDate, leave, chooseDay, chooseHour, noGroupAvailable, and, confirm, cancel, leaveMessage, confirmMessage] =
        [t("book your seat"), t("change date"), t("leave"), t("choose day"), t("choose hour"), t("no group available"), t("and"), t("confirm"), t("cancel"), t("leave message"), t("confirm message")];
    const { language } = useSelector((state) => state.languageState);
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const { loading: teacherLoading, teachersHistory, error: teacherError } = useSelector(state => state.teacherInfoState);
    const { loading: myTeachersLoading, myTeachers, error: myTeachersError } = useSelector(state => state.myTeachersState);
    const { loading: teachersLoading, closeTeacher, error: teachersError } = useSelector(state => state.closeTeachersState);
    const { loading: myGroupsLoading, myGroups, error: myGroupsError } = useSelector(state => state.myGroupsState);

    const [teacher, setTeacher] = useState(myTeachers.find(x => x?.id === item.id) || teachersHistory?.find(x => x?.id === item?.id));

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("")
    const [selectedGroup, setSelectedGroup] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const [selectedHour, setSelectedHour] = useState("00:00");
    const [selectedSubject, setSelectedSubject] = useState(subject)
    const [hours, setHours] = useState([]);
    const [buttonText, setButtonText] = useState({ text: bookSeat })
    const [networkPageVisible, setNetworkPageVisible] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    // // press handler 
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
        let myGroup = teacher.groups.find(x => x.id === hour.groupId)
        if (hour.day !== selectedDay) {
            setSelectedDay(hour.day)
        }
        updateGroup(myGroup, hour.day)
    }
    const changeSubjectHandler = (subject) => {
        setSelectedSubject(subject)
        const teacherBookedGroups = myGroups.filter(x => x.teacherId === teacher.id)
        const group = teacherBookedGroups.find(x => x.subject.id === subject?.id)
        updateGroup(group, null, subject)
    }


    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => { setIsConnected(state.isConnected); });
        return () => { unsubscribe(); };
    }, []);

    // functions 

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
            setSelectedSubject(subject || teacher.groups.map(x => x.subject)[0])
            setSelectedHour("00:00")
            setSelectedDay()
            setHours([])
        }
    }

    const getHours = (day, subject, group) => {
        let availableGroups = teacher.groups.filter(x => x.subject.id === subject.id && x.schoolYear.id === userInfo.schoolYear.id)
        availableGroups = availableGroups?.filter(x => x.days.map(y => y.day).includes(day)) || []
        let avHours = availableGroups.map(x => x.days.map(y => ({ ...y, groupId: x.id }))).flat()
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

    useEffect(() => {
        if (teacher) {
            const teacherBookedGroups = myGroups?.filter(x => x?.teacherId === teacher.id) || []
            if (selectedSubject) {
                updateGroup(teacherBookedGroups.find(x => x.subject.id === selectedSubject.id))
            } else {
                updateGroup(teacherBookedGroups[0])
            }
        }
    }, [teacher])

    useEffect(() => {
        if (!teacher) {
            const theTeacher = myTeachers.find(x => x?.id === item.id) || teachersHistory?.find(x => x?.id === item.id)
            if (!theTeacher) {
                if (isConnected) {
                    dispatch(getTeacherInfo(item.id))
                } else {
                    setNetworkPageVisible(true)
                }
            } else {
                setTeacher(theTeacher)
            }
        }
    }, [teachersHistory, isConnected])

    // button message
    useEffect(() => {
        if (teacher) {
            setButtonText(getButtonText())
        }
    }, [selectedGroup, selectedDay, teacher, myGroups])

    const getButtonText = () => {
        if (!selectedDay) {
            return ({ text: chooseDay })
        } else if (hours.length > 0 && selectedHour === "00:00") {
            return ({ text: chooseHour })
        } else if (hours.length === 0) {
            return ({ text: noGroupAvailable, notAvailable: true })
        } else if (selectedGroup) {
            const myBookedGroup = myGroups?.find(x => x.teacherId === item.id && x?.subject?.id === selectedGroup.subject.id)
            const isTheSameSubject = myBookedGroup?.subject?.id === selectedSubject.id
            if (myBookedGroup?.id === selectedGroup.id) {
                return ({ text: leave, booked: true })
            } else if (isTheSameSubject) {
                return ({ text: changeDate })
            } else {
                return ({ text: bookSeat })
            }
        }
    }
    // // submit handler
    const bookTeacher = () => {
        if (selectedGroup) {
            if (buttonText.booked) {
                dispatch(leaveGroup(selectedGroup.id, item.id))
            } else {
                const myGroupsColorArray = myGroups.filter(x => !!x.color).map(x => x.color)
                const theGroup = { ...selectedGroup, teacherId: item.id, color: teacher?.color || getColor(myGroupsColorArray) }
                dispatch(addGroup(theGroup, teacher))
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

    useEffect(() => {
        if (!myGroupsLoading) {
            setVisible(false)
        }
    }, [myGroupsLoading])

    return (
        <SafeAreaView style={[styles.container]} >
            <BackHeader title={t("teacher page")} />
            <LoadingModal visible={teacherLoading || myGroupsLoading} />
            <AlertModal
                visible={(visible)}
                imageSource={require('../assets/icons/alert.png')}
                title={confirm}
                content={message}
                primaryButton={confirm}
                secondaryButton={cancel}
                primaryButtonSubmit={() => { bookTeacher() }}
                secondaryButtonSubmit={() => setVisible(false)}
            />
            <NetworkPage visible={networkPageVisible} item={item} isConnected={isConnected} />
            <ScrollView style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {(teacher && !networkPageVisible) &&
                    <TeacherMainCard userInfo={userInfo} item={teacher} selectedSubject={selectedSubject} changeSubjectHandler={changeSubjectHandler} />
                }
                <View style={[styles.appContainer, { display: (teacher && !networkPageVisible) ? "flex" : "none" }]}>
                    <ContainerTitle title={t("about teacher")} />
                    <LongText content={teacher?.about} style={[styles.regular, { textAlign: getTextInputAlign(teacher?.about) }]} />
                    {/* <ContainerTitle title={t("Analytics")} pressedTitle={t("know more")} pressHandler={() => console.log("all")} /> */}
                    <ContainerTitle title={t("schedule")} pressedTitle={t("know more")} pressHandler={() => console.log("all")} />
                    <SlideContainer data={days} selectedGroup={selectedGroup} selectedDay={selectedDay} handelPress={dayHandelPress}   >
                        <DayOption />
                    </SlideContainer>
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>
                    {teacher &&
                        <SlideContainer data={sortArrayByTime(hours)} myGroups={myGroups?.filter(x => !((x?.teacherId === item.id && x?.subject?.id === selectedSubject?.id)))} teachers={closeTeacher} teacher={teacher} selectedGroup={selectedGroup} selectedHour={selectedHour} handelPress={hoursHandelPress}   >
                            <HoursOption />
                        </SlideContainer>
                    }
                    <ContainerTitle title={t("colleagues")} />
                    <SlideContainer data={friends} scrollAnimation={true}  >
                        <FriendItem teacher={teacher} />
                    </SlideContainer>
                </View>
            </ScrollView>
            <View style={[styles.buttonContainer, { display: (teacher && !networkPageVisible) ? "flex" : "none" }]}>
                <View style={{ paddingHorizontal: Padding.p_sm }} >
                    <Text style={[styles.regular]}>
                        {t("per month")}
                    </Text>
                    <Text style={[styles.title]}>
                        EL {teacher?.price}
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

