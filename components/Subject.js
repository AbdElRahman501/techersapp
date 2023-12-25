import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Color, globalStyles } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import CustomImage from './CustomImage ';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';

const Subject = React.memo(({ item, index, language }) => {
    const navigation = useNavigation()

    const handelScale = () => {
        if (item.addButton) {
            navigation.navigate("SearchScreen")
        } else if (item.isiInMySubject) {
            navigation.navigate("SubjectScreen", { item: item })
        } else {
            navigation.navigate("SearchScreen", { subject: item })
        }
    }
    return (
        <Animated.View entering={FadeInDown.duration(400 + (index * 200)).easing(Easing.ease)} >
            <Pressable style={({ pressed }) => ([styles.card, { transform: [{ scale: pressed ? 0.8 : 1 }] }])} onPress={handelScale}  >
                <View style={[globalStyles.subjectCard, globalStyles.shadowBox, { marginBottom: 5 }]}>
                    <CustomImage
                        style={{ height: "80%", width: "80%", opacity: item.isiInMySubject ? 1 : 0.5 }}
                        color={Color.darkcyan}
                        resizeMode="contain"
                        source={item?.imageSource}
                    />
                </View>
                <Text style={[globalStyles.contentText, { color: item.isiInMySubject ? Color.darkcyan : Color.darkgray }]}>{item?.[language] || item?.[language]}</Text>
            </Pressable>
        </Animated.View>
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default Subject;
const styles = StyleSheet.create({

    card: {
        alignItems: 'center',
        margin: 5
    },


})