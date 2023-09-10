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
export const findMyTeachers = (array, myTeachersArray) => {
    const ids = myTeachersArray.map(x => x.id)
    return array.filter(item => ids.includes(item.id)).map(x => {
        const mainSubject = myTeachersArray.find(y => y.id === x.id).subject
        return { ...x, mainSubject }
    })
};

export const searchEngin = (array, value) => {
    if (value) {

        return (array.filter(item => item.name.toLowerCase().includes(value.toLowerCase())))
    } else {
        return array
    }

}

export const teacherByYears = (array, year) => {
    return array.map(item => {
        if (item.mainSubject.schoolYears.find(x => x.id === year.id)) {
            return item
        }
    })
}

export const getTheWeek = () => {
    function getWeek(startDay) {
        const week = [];
        let currentDay = new Date(startDay);

        const dayNames = {
            '0': { ar: 'الأحد', en: 'Sun' },
            '1': { ar: 'الاثنين', en: 'Mon' },
            '2': { ar: 'الثلاثاء', en: 'Tue' },
            '3': { ar: 'الأربعاء', en: 'Wed' },
            '4': { ar: 'الخميس', en: 'Thu' },
            '5': { ar: 'الجمعة', en: 'Fri' },
            '6': { ar: 'السبت', en: 'Sat' }
        };

        for (let i = 0; i < 7; i++) {
            const dayId = currentDay.getDay().toString();
            const day = {
                day: dayNames[dayId],
                date: currentDay.getDate().toString(),
                id: dayId
            };

            week.push(day);
            currentDay.setDate(currentDay.getDate() + 1);
        }

        return week;
    }

    // Example usage: Get the current week starting from Sunday
    const today = new Date();
    const sunday = new Date(today.setDate(today.getDate() - today.getDay()));
    const week = getWeek(sunday);
    return week
}

export const transformTime = (time, language) => {
    const [hour, minute] = time.split(':');
    let convertedHour = parseInt(hour);
    let period = language === 'ar' ? 'ص' : 'AM';

    if (convertedHour >= 12) {
        period = language === 'ar' ? 'م' : 'PM';;
    }

    if (convertedHour > 12) {
        convertedHour -= 12;
    }

    return `${convertedHour}:${minute} ${period}`;
}