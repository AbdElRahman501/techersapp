import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import BackHeader from '../components/BackHeader';
import { days, friends, hours } from '../data';
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

export default function TeacherScreen({ route }) {
    const { item } = route.params;
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(0);



    const dayHandelPress = (id) => {
        setSelectedDay(id)
    }
    const hoursHandelPress = (id) => {
        setSelectedHour(id)
    }
    return (
        <SafeAreaView style={[styles.container]} >
            <BackHeader title={t("teacher page")} />
            <ScrollView style={{ flex: 1 }}
                showsVerticalScrollIndicator={false} // Hide vertical scroll bar
                showsHorizontalScrollIndicator={false} // Hide horizontal scroll bar
            >
                <TeacherMainCard item={item} />
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
                    <SlideContainer disabled={selectedDay === 0} select={true} SelectedId={selectedHour} handelPress={hoursHandelPress} data={hours.slice(0, hours.length / 2)}  >
                        <HoursOption />
                    </SlideContainer>
                    <SlideContainer disabled={selectedDay === 0} select={true} SelectedId={selectedHour} handelPress={hoursHandelPress} data={hours.slice(hours.length / 2)}  >
                        <HoursOption />
                    </SlideContainer>
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
                <PrimaryButton style={{ width: "65%" }} pressHandler={() => console.log("book")} disabled={selectedDay === 0 || selectedHour === 0} >
                    <Text style={styles.buttonText}>{t("book your seat")}</Text>
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
