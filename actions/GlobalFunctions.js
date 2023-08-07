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
    if (inputType === 'email') {
        if (!inputValue?.trim()) {
            return {
                error: {
                    inputType, message: {
                        ar: 'برجاء قم بإدخال البريد الإلكتروني',
                        en: 'Please enter your email'
                    }
                }
            };
        } else if (!validateEmail(inputValue)) {
            return {
                error: {
                    inputType, message: {
                        ar: 'برجاء قم بإدخال بريد إلكتروني صحيح',
                        en: 'Please enter a valid email'
                    }
                }
            };
        }
    } else if (inputType === 'password') {
        if (!inputValue?.trim()) {
            return {
                error: {
                    inputType, message: {
                        ar: 'أدخل كلمة المرور',
                        en: 'Please enter your password'
                    }
                }
            };
        } else if (inputValue.length < 6) {
            return {
                error: {
                    inputType, message: {
                        ar: 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل',
                        en: 'Password should be at least 6 characters long'
                    }
                },
            };
        }
    } else if (inputType === 'phone') {
        if (!inputValue?.trim()) {
            return {
                error: {
                    inputType, message: {
                        ar: 'أدخل رقم الجوال',
                        en: 'Please enter your phone number'
                    }
                }
            };
        } else if (inputValue.length < 11) {
            return {
                error: {
                    inputType, message: {
                        ar: 'رقم الجوال يجب أن يحتوي على 11 رقم على الأقل',
                        en: 'Phone number should be at least 11 digits long'
                    }
                },
            };
        }
    } else if (inputType === 'name') {
        if (!inputValue?.trim()) {
            return {
                error: {
                    inputType, message: {
                        ar: 'أدخل الاسم',
                        en: 'Please enter your name'
                    }
                }
            };
        } else if (inputValue.length < 6) {
            return {
                error: {
                    inputType, message: {
                        ar: 'الاسم يجب أن يحتوي على 6 أحرف على الأقل',
                        en: 'Name should be at least 6 characters long'
                    }
                },
            };
        }
    } else {
        if (!inputValue?.trim()) {
            return {
                error: {
                    inputType, message: {
                        ar: 'ادخل القيمة ال ' + inputType + ' بشكل صحيح',
                        en: 'Please enter a valid ' + inputType
                    }
                },
            };
        }
    }

    return { success: true };
};


export const isArabic = (text) => {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    return arabicRegex.test(text);
};

export const getTextInputAlign = (text) => {
    if (text) {
        return isArabic(text) ? "right" : "left";
    }
};