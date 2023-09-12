import { MESSAGE } from "../constants/messageConstants";

const messageReducer = (state = { message: '' }, action) => {
    switch (action.type) {
        case 'SHOW_MESSAGE':
            return {
                ...state,
                message: action.payload,
            };
        case 'HIDE_MESSAGE':
            return {
                ...state,
                message: '',
            };
        default:
            return state;
    }
};

export default messageReducer;