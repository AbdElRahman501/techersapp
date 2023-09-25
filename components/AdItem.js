import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Color, fontEm, globalStyles, heightPercentage, widthPercentage } from '../GlobalStyles';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import t from '../actions/changeLanguage';
import { getSubjectTitle, getTitle } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import CustomImage from './CustomImage ';

const AdItem = React.memo(({ item, holdHandler }) => {
    const { language } = useSelector(state => state.languageState)
    const navigation = useNavigation()
    const handlePress = () => {
        navigation.navigate("TeacherScreen", { item })
    }
    return (
        <LongPressGestureHandler onHandlerStateChange={holdHandler} >
            <View style={styles.itemContainer} >
                <View style={{ flex: 1 }}>
                    <Text style={globalStyles.title}>{getTitle(item.gender, item.name)}</Text>
                    <Text style={[globalStyles.regular, { color: Color.gray_200, textAlign: 'center' }]}>{getSubjectTitle(item.gender, item.mainSubject[language])}</Text>
                    <TouchableOpacity onPress={handlePress} style={styles.primaryButton}>
                        <Text style={[globalStyles.regular, { color: Color.white }]}>
                            {t("book-now")}
                        </Text>
                    </TouchableOpacity>
                </View>
                <CustomImage
                    style={{ height: heightPercentage(18), width: heightPercentage(18), borderRadius: heightPercentage(18) / 2, marginHorizontal: fontEm(1) }}
                    resizeMode="center"
                    source={item.imageSource}
                />
            </View>
        </LongPressGestureHandler>
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});
export default AdItem;

const styles = StyleSheet.create({
    itemContainer: {
        width: widthPercentage(100) - 48,
        height: heightPercentage(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        marginTop: 10,
        height: 30,
        width: 100,
        backgroundColor: Color.darkcyan,
        borderRadius: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }

})