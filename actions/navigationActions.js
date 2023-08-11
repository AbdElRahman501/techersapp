import { Alert, BackHandler } from 'react-native'


export const handleBackPress = (history) => {

    if (history.length > 1) {
        // There are screens to go back to, navigate back normally
        return false;
    } else {
        Alert.alert(
            'Exit App',
            'Are you sure you want to exit the app?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Exit',
                    onPress: () => {
                        // Handle the exit action here, e.g., by using BackHandler.exitApp()
                        BackHandler.exitApp();
                    },
                },
            ],
            { cancelable: false }
        );

        // Prevent the default back action
        return true;
    }

};