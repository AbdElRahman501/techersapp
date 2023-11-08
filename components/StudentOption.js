import { TouchableOpacity, Alert, Image, View } from 'react-native'
import React from 'react'
import CustomText from './CustemText'
import { Color, Height, Margin, globalStyles } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux'
import t from '../actions/changeLanguage'
import { signIn } from '../store/actions/userActions'

export default function StudentOption({ student }) {
    const navigation = useNavigation()
    const { language } = useSelector(state => state.languageState)
    const [studentParentAccount, studentAccount] = [t("student-parent account"), t("student account")]

    const dispatch = useDispatch()
    const handlePress = () => {
        if (student?.isParent) {
            dispatch(signIn({ id: student.id, password: student.password }))
        } else {
            Alert.alert(
                'حساب طالب مستقل',
                'يجب عليك تسجيل الدخول بحساب هذا الطالب للمتابعة',
                [
                    {
                        text: 'ok',
                        onPress: () => {
                            navigation.navigate("SigninScreen")
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    }

    return (
        <TouchableOpacity onPress={handlePress} style={[globalStyles.student, { flexDirection: language === "en" ? "row" : "row-reverse", alignItems: "center" }]}>
            <Image
                style={{ height: Height.hi_md, width: Height.hi_md, borderRadius: Height.hi_md / 2 }}
                resizeMode="contain"
                source={require('../assets/teachers/boy.png')}
            />
            <View style={{ marginHorizontal: Margin.m_sm }}>
                <CustomText style={[globalStyles.regular, { color: Color.darkcyan }]}>{student?.fullName || ""}</CustomText>
                <CustomText style={globalStyles.smallText}>{student?.schoolYear || ""}</CustomText>
                <CustomText style={globalStyles.smallText}>{student.parentPhoneNumber ? studentParentAccount : studentAccount}</CustomText>
            </View>
        </TouchableOpacity>
    )
}
