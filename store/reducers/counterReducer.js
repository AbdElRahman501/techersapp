import { DECREMENT, INCREMENT, RESET_COUNTER } from "../constatnts/conterContatnts";

const counterReducer = (state = { count: 0 }, action) => {

  switch (action.type) {
    case INCREMENT:
      return { ...state, count: action.payload.count };
    case DECREMENT:
      return { ...state, count: action.payload.count };
    case RESET_COUNTER:
      return { ...state, count: action.payload.count };
    default:
      return state;
  }
};

export default counterReducer;
