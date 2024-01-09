import { StyleSheet, Text, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
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
import { getBookedMessage, getButtonText, getColor, getHours, getTextInputAlign, sortArrayByTime } from '../actions/GlobalFunctions';
import LongText from '../components/LongText';
import PrimaryButton from '../components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from '../components/alertModal';
import LoadingModal from '../components/LoadingModal';
import { getTeacherInfo } from '../store/actions/teachersActions';
import { addGroup, leaveGroup } from '../store/actions/groupsActions';
import NetInfo from '@react-native-community/netinfo';
import NetworkPage from '../components/NetworkPage';
import { showMessage } from '../store/actions/showMessageActions';

export default function TeacherScreen({ route }) {
    const { item, subject } = route.params;
    const dispatch = useDispatch();
    let [leave, confirm, cancel, leaveMessage, confirmMessage] = [t("leave"), t("confirm"), t("cancel"), t("leave message"), t("confirm message")];
    const { language } = useSelector((state) => state.languageState);
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const { loading: teacherLoading, teachersHistory, error: teacherError } = useSelector(state => state.teacherInfoState);
    const { loading: myTeachersLoading, myTeachers, error: myTeachersError } = useSelector(state => state.myTeachersState);
    const { loading: teachersLoading, closeTeacher, error: teachersError } = useSelector(state => state.closeTeachersState);
    const { loading: myGroupsLoading, myGroups, error: myGroupsError } = useSelector(state => state.myGroupsState);

    const [teacher, setTeacher] = useState(myTeachers.find(x => x?.id === item.id) || teachersHistory?.find(x => x?.id === item?.id));
    const theInitialGroup = myGroups?.filter(x => x?.teacherId === teacher?.id)[0]
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("")
    const [selectedGroup, setSelectedGroup] = useState(theInitialGroup);
    const [selectedDay, setSelectedDay] = useState(theInitialGroup?.days?.map(x => x?.day)?.[0]);
    const [selectedHour, setSelectedHour] = useState(theInitialGroup?.days?.find(x => x?.day === selectedDay)?.timeIn24Format || "00:00");
    const [selectedSubject, setSelectedSubject] = useState(subject || theInitialGroup?.subject)
    const [hours, setHours] = useState(getHours(selectedDay, selectedSubject, selectedGroup, userInfo, teacher) || []);
    const [buttonText, setButtonText] = useState(getButtonText(item, myGroups, selectedGroup, selectedSubject, selectedDay, hours, selectedHour))
    const [isConnected, setIsConnected] = useState(true);

    const [refreshing, setRefreshing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
        setHours(getHours(fullName, selectedSubject, selectedGroup, userInfo, teacher))
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
        const group = teacherBookedGroups.find(x => x.subject === subject)
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
            setHours(getHours(theSelectedDay, group.subject, group, userInfo, teacher))
            setSelectedHour(group.days.find(x => x.day === theSelectedDay).timeIn24Format)
        } else {
            setSelectedGroup()
            setSelectedSubject(subject || selectedSubject || teacher.groups.map(x => x.subject)[0])
            setSelectedHour("00:00")
            setSelectedDay()
            setHours([])
        }
    }


    useEffect(() => {
        if (teacher) {
            const teacherBookedGroups = myGroups?.filter(x => x?.teacherId === teacher.id) || []
            if (selectedSubject) {
                updateGroup(teacherBookedGroups.find(x => x.subject === selectedSubject))
            } else if (!selectedGroup) {
                updateGroup(teacherBookedGroups[0])
            }
        }
    }, [teacher])

    useEffect(() => {
        if (!teacher || refreshing) {
            const theTeacher = refreshing ? teachersHistory?.find(x => x?.id === item.id) : (myTeachers.find(x => x?.id === item.id) || teachersHistory?.find(x => x?.id === item.id))
            if (!theTeacher) {
                if (isConnected) {
                    dispatch(getTeacherInfo(item.id))
                }
            } else {
                setTeacher(theTeacher)
                setRefreshing(false)
            }
        }
    }, [teachersHistory, myTeachers, isConnected])

    // button message
    useEffect(() => {
        if (teacher) {
            setButtonText(getButtonText(item, myGroups, selectedGroup, selectedSubject, selectedDay, hours, selectedHour))
        }
    }, [selectedGroup, selectedDay, teacher, myGroups])


    // // submit handler
    const bookTeacher = () => {
        if (selectedGroup) {
            if (buttonText.booked) {
                dispatch(leaveGroup(selectedGroup.id, item.id))
            } else {
                const myGroupsColorArray = myGroups.filter(x => !!x.color).map(x => x.color)
                const joinedAt = new Date()
                const newGroup = { ...selectedGroup, joinedAt, teacherId: item.id, color: teacher?.color || getColor(myGroupsColorArray) }
                dispatch(addGroup(newGroup, { ...item, ...teacher, subjects: undefined, distance: item.distance }))
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


    const onRefresh = () => {
        if (isConnected) {
            setRefreshing(true);
            dispatch(getTeacherInfo(item.id))
            updateGroup()
        } else {
            dispatch(showMessage("no internet connection"))
        }
    };

    return (
        <SafeAreaView style={[styles.container]} >
            <NetworkPage title={t("teacher page")} visible={!teacher} />
            <BackHeader title={t("teacher page")} />
            <LoadingModal visible={!refreshing && (teacherLoading || myGroupsLoading)} />
            <AlertModal
                visible={(visible)}
                type={buttonText.booked ? "danger" : "alert"}
                title={confirm}
                content={message}
                primaryButton={buttonText.booked ? leave : confirm}
                secondaryButton={cancel}
                primaryButtonStyle={{ backgroundColor: buttonText.booked ? Color.red : Color.darkcyan }}
                primaryButtonSubmit={() => { bookTeacher() }}
                secondaryButtonSubmit={() => setVisible(false)}
            />
            <ScrollView style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                <TeacherMainCard userInfo={userInfo} item={teacher || item} selectedSubject={selectedSubject} changeSubjectHandler={changeSubjectHandler} />
                <View style={[styles.appContainer, { display: teacher ? "flex" : "none" }]}>
                    <ContainerTitle title={t("about teacher")} style={{ marginTop: 10 }} />
                    <LongText content={teacher?.about} style={[styles.regular, { textAlign: getTextInputAlign(teacher?.about) }]} />
                    <ContainerTitle title={t("Analytics")} />
                    <Analytics />
                    <ContainerTitle title={t("schedule")} />
                    {errorMessage && <Text>{errorMessage}</Text>}
                    <SlideContainer data={days} selectedGroup={selectedGroup} selectedDay={selectedDay} handelPress={dayHandelPress}   >
                        <DayOption />
                    </SlideContainer>
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>
                    {teacher &&
                        <SlideContainer data={sortArrayByTime(hours)} myGroups={myGroups?.filter(x => !((x?.teacherId === item.id && x?.subject === selectedSubject)))} teachers={closeTeacher} teacher={teacher} selectedGroup={selectedGroup} selectedHour={selectedHour} handelPress={hoursHandelPress}   >
                            <HoursOption />
                        </SlideContainer>
                    }
                    <ContainerTitle title={t("colleagues")} style={{ marginTop: 10 }} />
                    <SlideContainer data={friends} scrollAnimation={true}  >
                        <FriendItem teacher={teacher} />
                    </SlideContainer>
                </View>
            </ScrollView>
            <View style={[styles.buttonContainer, { display: teacher ? "flex" : "none" }]}>
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
                    <Text style={styles.buttonText}>{t(buttonText.text)}</Text>
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

