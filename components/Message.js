import { StyleSheet, Animated, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as messageActions from "../store/actions/showMessageActions";
import { Color, FontFamily, FontSize } from '../GlobalStyles';


export default function Message() {
    const { message: theMessage } = useSelector(state => state.messageState)
    const dispatch = useDispatch();

    const [message, setMessage] = useState("");
    const [animation] = useState(new Animated.Value(0));

    const showMessage = (messageText) => {
        setMessage(messageText);
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                hideMessage();
            }, 3500);
        });
    };

    const hideMessage = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setMessage("");
        });
    };

    const animatedStyle = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [150, 0],
                }),
            },
        ],
    };

    useEffect(() => {
        if (theMessage && !message) {
            showMessage(theMessage)
            setTimeout(() => {
                dispatch(messageActions.hideMessage());
            }, 3500);
        }
    }, [theMessage])


    return message && (
        <Animated.View style={[styles.container, animatedStyle]}>
            <View style={styles.messageContainer}>
                <Text style={styles.title}>{message}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: "absolute",
        paddingHorizontal: 20,
        bottom: 150,
        zIndex: 100
    },
    messageContainer: {
        backgroundColor: Color.cyanBackGround,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        borderBottomRightRadius: 0,
        shadowColor: Color.gray_200,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: Platform.OS === 'android' ? 10 : 0,
    },
    title: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black
    }
})

