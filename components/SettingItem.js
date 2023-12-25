import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { Color, Height, Margin, globalStyles } from '../GlobalStyles'
import { Next_Icon } from '../assets/icons/Icons'
import { useSelector } from 'react-redux'

export default function SettingItem({ Icon, title, regular, pressHandler, style }) {
    const { language } = useSelector(state => state.languageState)
    return (
        <Pressable onPress={pressHandler} style={[globalStyles.parentFlexBox, { marginVertical: 5, width: "100%", justifyContent: "space-between", flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
            {({ pressed }) => (
                <>
                    <View style={[globalStyles.parentFlexBox, { flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
                        <View style={[globalStyles.shadowBox, { opacity: pressed ? 0.5 : 1, elevation: 10, width: Height.hi_md, height: Height.hi_md, backgroundColor: Color.white, borderRadius: Height.hi_md / 2, alignItems: 'center', justifyContent: 'center' }]} >
                            <Icon width={24} height={24} viewBox="0 0 24 24" />
                        </View>
                        <Text style={[globalStyles.regular, { opacity: pressed ? 0.5 : 1, marginHorizontal: Margin.m_base, }, style]} >{title}</Text>
                    </View>
                    <View style={[globalStyles.parentFlexBox, { opacity: pressed ? 0.5 : 1, flexDirection: language === 'en' ? "row" : "row-reverse", alignItems: "center", gap: 5 }]}>
                        <Text style={[globalStyles.regular, { textTransform: 'uppercase', paddingHorizontal: 5, color: Color.darkgray }]} >{regular || ""}</Text>
                        <Next_Icon color={Color.darkgray} style={{ top: 2, transform: [{ scaleX: language === 'en' ? 1 : -1 }] }} />
                    </View>
                </>
            )}
        </Pressable>
    )
}
