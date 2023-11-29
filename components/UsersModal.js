import { Modal, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import { Color, Height, Margin, globalStyles } from '../GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import CustomImage from './CustomImage '
import CustomText from './CustemText'
import { switchUsers } from '../store/actions/userActions'
import t from '../actions/changeLanguage'
import { getTheYear } from '../actions/GlobalFunctions'

export default function UsersModal({ usersVisible, setUsersVisible, users, userInfo }) {
    const [selected, setSelected] = useState(userInfo)
    const { language } = useSelector(state => state.languageState)
    const { schoolYears } = useSelector(state => state.schoolYearsState)
    const dispatch = useDispatch()
    const [switchTitle, cancel] = [t("switch"), t("cancel")]

    const submitHandler = () => {
        if (userInfo?.id !== selected.id) {
            dispatch(switchUsers({ id: selected.id, password: selected.password }))
            setUsersVisible(false)
        }
    }

    return (
        <Modal visible={usersVisible === true} animationType="fade" transparent>
            <View style={globalStyles.modalContainer}>
                <View style={[globalStyles.modalContent]}>
                    {users?.map((student =>
                        <TouchableOpacity key={student.id} onPress={() => setSelected(student)} style={[globalStyles.student, { backgroundColor: selected?.id === student.id ? Color.lightCyan : Color.white, flexDirection: language === "en" ? "row" : "row-reverse", alignItems: "center" }]}>
                            <CustomImage
                                style={{ height: Height.hi_md, width: Height.hi_md, borderRadius: Height.hi_md / 2 }}
                                resizeMode="contain"
                                source={require('../assets/teachers/boy.png')}
                            />
                            <View style={{ marginHorizontal: Margin.m_sm }}>
                                <CustomText style={[globalStyles.regular, { color: Color.darkcyan }]}>{student?.fullName || ""}</CustomText>
                                <CustomText style={globalStyles.smallText}>{(getTheYear(schoolYears, student?.schoolYear)[language]) || ""}</CustomText>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style={{ width: "100%", gap: 15, flexDirection: "row", marginTop: 10 }}>
                        <PrimaryButton
                            style={{ flex: 2, backgroundColor: Color.white, borderWidth: 1, borderColor: Color.darkcyan }}
                            onPress={() => setUsersVisible(false)}>
                            <Text style={[globalStyles.contentText, { color: Color.darkcyan }]}>{cancel}</Text>
                        </PrimaryButton>
                        <PrimaryButton style={[{ flex: 2 }]} onPress={submitHandler}>
                            <Text style={[globalStyles.contentText, { color: Color.white }]}>{switchTitle}</Text>
                        </PrimaryButton>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({})