export const submitCheck = (inputs) => {
    const errors = {};
    for (const property in inputs) {
        let error = inputChecker(inputs[property], property).error
        if (error) {
            errors[property] = error.message;
        }
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors,
    };
}


export const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};


export const inputChecker = (inputValue, inputType) => {
    if (inputType === "email") {
        if (!inputValue.trim()) {
            return { error: { inputType, message: 'برجاء قم بإدخال البريد الإلكتروني' } };
        } else if (!validateEmail(inputValue)) {
            return { error: { inputType, message: 'برجاء قم بإدخال بريد إلكتروني صحيح' } };
        }
    } else if (inputType === "password") {
        if (!inputValue.trim()) {
            return { error: { inputType, message: 'أدخل كلمة المرور' } };
        } else if (inputValue.length < 6) {
            return { error: { inputType, message: 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل' } };
        }
    } else if (inputType === "phone") {
        if (!inputValue.trim()) {
            return { error: { inputType, message: 'أدخل رقم الجوال' } };
        } else if (inputValue.length < 11) {
            return { error: { inputType, message: 'رقم الجوال يجب أن يحتوي على 11 رقم على الأقل' } };

        }
    } else if (inputType === "name") {
        if (!inputValue.trim()) {
            return { error: { inputType, message: 'أدخل الاسم ' } };

        } else if (inputValue.length < 6) {
            return { error: { inputType, message: 'الاسم يجب أن يحتوي على 6 أحرف على الأقل' } };

        }
    } else {
        if (!inputValue.trim()) {
            return { error: { inputType, message: 'ادخل القيمة ال ' + inputType + ' بشكل صحيح' } };

        }
    }

    return { success: true };
}

export const isArabic = (text) => {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    return arabicRegex.test(text);
};

export const getTextInputAlign = (text) => {
    if (text) {
        return isArabic(text) ? "right" : "left";
    }
};