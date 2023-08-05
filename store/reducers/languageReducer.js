import { LANGUAGE } from "../constatnts/languageConstatnts";

 const languageReducer = (state = { language: "ar" }, action) => {

  switch (action.type) {
    case LANGUAGE:
      return { ...state, language: action.payload.language };
    default:
      return state;
  }
};

export default languageReducer;