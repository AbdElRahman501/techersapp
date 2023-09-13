import { MESSAGE } from "../constants/messageConstants";

export const showMessage = (message) => {
    return {
        type: 'SHOW_MESSAGE',
        payload: message,
    };
};

export const hideMessage = () => {
    return {
        type: 'HIDE_MESSAGE',
    };
};