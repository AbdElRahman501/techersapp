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
export const formatPhoneNumber = (phoneNumber) => {
    const maskedDigits = phoneNumber.length - (5);
    const visiblePart = phoneNumber.substr(0, 3) + '*'.repeat(maskedDigits) + phoneNumber.substr(-2);
    return visiblePart;
}

export const formatDistance = (distance, lang) => {
    if (distance >= 1000) {
        const kilometers = distance / 1000;
        return kilometers.toFixed(0) + (lang === 'ar' ? ' كم' : ' km');
    } else {
        return distance + (lang === 'ar' ? ' م' : ' m');
    }
};
export const checkArrayForUserId = (array, userId) => {
    return array.some((item) => item.id === userId);
};

export const getTitle = (gender, name) => {
    let language = isArabic(name) ? "ar" : "en"
    if (language === 'ar') {
        if (gender === 'male') {
            return 'الأستاذ. ' + name;
        } else if (gender === 'female') {
            return 'الأستاذة. ' + name;
        }
    } else if (language === 'en') {
        if (gender === 'male') {
            return 'Mr. ' + name;
        } else if (gender === 'female') {
            return 'Ms. ' + name;
        }
    }

    return '';
}
export const getSubjectTitle = (gender, subject) => {
    let language = isArabic(subject) ? "ar" : "en"
    if (language === 'ar') {
        if (gender === 'male') {
            return 'مدرس ' + subject;
        } else if (gender === 'female') {
            return 'مدرسة ' + subject;
        }
    } else if (language === 'en') {
        return subject + " Teacher";
    }

    return '';
}

export const filterArrayByIds = (array, idArray) => {
    const ids = idArray.map(x => x.id)
    return array.filter(item => ids.includes(item.id));
};

export const searchEngin = (array, value) => {
    if (value) {
        
        return (array.filter(item => item.name.toLowerCase().includes(value.toLowerCase())))
    }else{
        return array
    }

}