import { LANGUAGE } from "../constatnts/languageConstatnts";

export const changeLanguage = (language) => async (dispatch) => {
    dispatch({
        type: LANGUAGE,
        payload: {
            language,
        }
    })
};

export const ToggleLanguage = () => async (dispatch, getState) => {
    const { language } = getState().languageState
    dispatch({
        type: LANGUAGE,
        payload: {
            language: language === "ar" ? "en" : "ar",
        }
    })
};