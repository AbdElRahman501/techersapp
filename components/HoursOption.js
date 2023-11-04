import React, { useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Color, FontSize, Height, Margin, globalStyles } from '../GlobalStyles'
import { useSelector } from 'react-redux';
import { areGroupsOverLapped, getBookedMessage, getTitle, transformTime } from '../actions/GlobalFunctions';
import AlertModal from './alertModal';
import { useNavigation } from '@react-navigation/core';
import { days, teachers } from '../data';
import CustomImage from './CustomImage ';
import CustomText from './CustemText';
import t from '../actions/changeLanguage';

const HoursOption = React.memo(({ item, selectedHour, teacher, myGroups, handelPress }) => {
    const { language } = useSelector(state => state.languageState)
    let isSelected = selectedHour === item.timeIn24Format
    let teacherGroup = teacher.groups.find(x => x.id === item.groupId)
    const { overLapped: unavailable, overlappedTime } = areGroupsOverLapped(myGroups, teacherGroup)
    const [visible, setVisible] = useState(false);

    const [myTeacher, setMyTeacher] = useState()
    const [overLappedGroup, setOverLapGroup] = useState()
    const navigation = useNavigation()
    const [message, setMessage] = useState("")
    const [overLappedMessage, setOverLappedMessage] = useState("")

    useEffect(() => {
        if (overlappedTime?.teacherId) {
            const theTeacher = teachers.find(x => x.id === overlappedTime.teacherId)
            const group = theTeacher.groups.find(x => x.id === overlappedTime.groupId)
            setMyTeacher(theTeacher)
            setOverLapGroup(group)
        }
    }, [overlappedTime?.teacherId])

    const handleChangeDate = () => {
        if (myTeacher) {
            setVisible(false)
            navigation.push("TeacherScreen", { item: myTeacher })
        }
    };
    const submitHandler = () => {
        if (unavailable) {
            setVisible(true)
            setMessage(getBookedMessage(teacherGroup, language))
            setOverLappedMessage(getBookedMessage(overLappedGroup, language))
        } else {
            handelPress(item)
        }
    }
    return (
        <>
            <AlertModal
                visible={visible}
                imageSource={require('../assets/icons/alert.png')}
                title={t("sorry") + " 😔 " + t("conflict")}
                content={t('cannot book time', { message: message })}
                primaryButton={t("change")}
                primaryButtonSubmit={() => setVisible(false)}
            >
                <TouchableOpacity onPress={handleChangeDate} style={[globalStyles.student, { width: "100%", marginVertical: 0, marginTop: Margin.m_sm, flexDirection: language === "en" ? "row" : "row-reverse", alignItems: "center" }]}>
                    <CustomImage
                        style={{ height: Height.hi_md, width: Height.hi_md, borderRadius: Height.hi_md / 2 }}
                        resizeMode="contain"
                        source={myTeacher?.imageSource}
                    />
                    <View style={{ marginHorizontal: Margin.m_sm, flex: 1 }}>
                        <CustomText style={[globalStyles.regular, { color: Color.darkcyan }]}>{getTitle(myTeacher?.gender, myTeacher?.name) + " (" + overLappedGroup?.subject[language] + ")"}</CustomText>
                        <CustomText style={globalStyles.smallText}>{overLappedMessage}</CustomText>
                    </View>
                </TouchableOpacity>

            </AlertModal>
            <TouchableWithoutFeedback
                onPress={submitHandler}   >
                <View style={[globalStyles.dayCard, {
                    width: 100,
                    height: 40,
                    backgroundColor: isSelected ? Color.darkcyan : item?.secondary ? Color.cyanBackGround : Color.white,
                    opacity: unavailable ? 0.5 : 1
                }]}>
                    <Text style={[globalStyles.regular, { color: isSelected ? Color.white : Color.black }]} >
                        {transformTime(item.timeIn24Format, language)}
                    </Text>
                </View>
            </TouchableWithoutFeedback >
        </>
    )
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default HoursOption;
