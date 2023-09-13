import { LANGUAGE } from "../constants/languageConstants";

 const languageReducer = (state = { language: "ar" }, action) => {

  switch (action.type) {
    case LANGUAGE:
      return { ...state, language: action.payload.language };
    default:
      return state;
  }
};

export default languageReducer;