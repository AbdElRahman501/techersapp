import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, data) => {
    try {
        const dataJSON = JSON.stringify(data);
        console.log("🚀 ~ file: storageActions.js:6 ~ saveData ~ dataJSON:", dataJSON)
        await AsyncStorage.setItem(key, dataJSON);
        console.log('Data saved successfully.');
    } catch (error) {
        console.log('Error saving data:', error);
    }
};




// export const fetchData = async (key) => {
//     try {
//         const dataJSON = await AsyncStorage.getItem(key);
//         console.log("🚀 ~ file: storageActions.js:20 ~ fetchData ~ dataJSON:", dataJSON)

//         if (dataJSON !== null) {
//             const userData = JSON.parse(dataJSON);
//             console.log("🚀 ~ file: storageActions.js:24 ~ fetchData ~ userData:", userData)
//             // return userData;
//         } else {
//             return null;
//         }
//     } catch (error) {
//         return console.error('Error fetching data:', error);
//     }
// };

// Call the function to fetch data
