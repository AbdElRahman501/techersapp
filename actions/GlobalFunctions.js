import { teachers } from "../data";

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
export const getModifiedName = (fullName) => {
    if (isArabic(fullName)) {
        return fullName;

    } else {
        const names = fullName.split(' ');
        const modifiedNames = names.filter((name, index) => index === 0 || index === names.length - 1);
        const modifiedFullName = modifiedNames.map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
        return modifiedFullName;
    }
}
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

const dayNames = {
    '0': { ar: 'الأحد', en: 'Sun', fullName: 'Sunday' },
    '1': { ar: 'الاثنين', en: 'Mon', fullName: 'Monday' },
    '2': { ar: 'الثلاثاء', en: 'Tue', fullName: 'Tuesday' },
    '3': { ar: 'الأربعاء', en: 'Wed', fullName: 'Wednesday' },
    '4': { ar: 'الخميس', en: 'Thu', fullName: 'Thursday' },
    '5': { ar: 'الجمعة', en: 'Fri', fullName: 'Friday' },
    '6': { ar: 'السبت', en: 'Sat', fullName: 'Saturday' }
};

const monthNames = {
    '0': { ar: 'يناير', en: 'January', fullName: 'January' },
    '1': { ar: 'فبراير', en: 'February', fullName: 'February' },
    '2': { ar: 'مارس', en: 'March', fullName: 'March' },
    '3': { ar: 'أبريل', en: 'April', fullName: 'April' },
    '4': { ar: 'مايو', en: 'May', fullName: 'May' },
    '5': { ar: 'يونيو', en: 'June', fullName: 'June' },
    '6': { ar: 'يوليو', en: 'July', fullName: 'July' },
    '7': { ar: 'أغسطس', en: 'August', fullName: 'August' },
    '8': { ar: 'سبتمبر', en: 'September', fullName: 'September' },
    '9': { ar: 'أكتوبر', en: 'October', fullName: 'October' },
    '10': { ar: 'نوفمبر', en: 'November', fullName: 'November' },
    '11': { ar: 'ديسمبر', en: 'December', fullName: 'December' }
};
export const getTheMonths = () => {
    const today = new Date();
    const sunday = new Date(today.setDate(today.getDate() - today.getDay()));
    const week = [];
    let currentDay = new Date(sunday);

    const currentMonthIndex = today.getMonth();
    const months = [
        { ...monthNames[currentMonthIndex - 1], id: currentMonthIndex - 1 },
        { ...monthNames[currentMonthIndex], id: currentMonthIndex }
    ];
    for (let i = 0; i < 7; i++) {
        const dayId = currentDay.getDay().toString();
        const day = {
            day: dayNames[dayId],
            date: currentDay.getDate().toString(),
            id: `${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-${currentDay.getDate()}`,
            fullName: dayNames[dayId].fullName

        };
        week.push(day);
        currentDay.setDate(currentDay.getDate() + 1);
    }

    const todayIndex = new Date().getDay();
    const todayObj = week[todayIndex];

    const currentMonth = months[1];

    return { today: todayObj, week, months, currentMonth };
};
export const getWeeksOfMonth = (currentMonthIndex) => {
    const weeks = [];
    const firstDayOfMonth = new Date(new Date().getFullYear(), currentMonthIndex, 1);
    const lastDayOfMonth = new Date(new Date().getFullYear(), currentMonthIndex + 1, 0);

    let currentDay = new Date(firstDayOfMonth);
    let theLastDay = new Date(lastDayOfMonth);

    theLastDay.setDate(theLastDay.getDate() + (6 - theLastDay.getDay()));
    currentDay.setDate(currentDay.getDate() - currentDay.getDay());

    while (currentDay <= theLastDay || weeks[weeks.length - 1]?.length < 7) {
        const dayId = currentDay.getDay().toString();
        const day = {
            day: dayNames[dayId],
            date: currentDay.getDate().toString(),
            id: `${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-${currentDay.getDate()}`,
            fullName: dayNames[dayId].fullName
        };

        if (dayId === '0') {
            weeks.push([]);
        }
        weeks[weeks.length - 1].push(day);

        currentDay.setDate(currentDay.getDate() + 1);
    }

    return weeks;
}

export const transformTime = (time, language) => {
    const [hour, minute] = typeof time === 'string' ? time.split(':') : [time, "00"];
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
export const calculateEndTime = (startTime, duration) => {
    // Convert the start time to minutes
    const [startHour, startMinute] = startTime.split(":");
    const startMinutes = parseInt(startHour) * 60 + parseInt(startMinute);

    // Calculate the end time in minutes
    const endMinutes = startMinutes + duration;

    // Convert the end time back to 24-hour format
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;

    return endTime;
}
export const isTimeBetween = (time, startTime, endTime) => {
    const [timeHour, timeMinute] = time.split(":");
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    const timeMinutes = parseInt(timeHour) * 60 + parseInt(timeMinute);
    const startMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
    const endMinutes = parseInt(endHour) * 60 + parseInt(endMinute);

    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
}
export const areAppointmentsOverlapping = (firstTime, secondTime) => {
    const firstTimeParts = firstTime.timeIn24Format.split(":");
    const secondTimeParts = secondTime.timeIn24Format.split(":");

    const firstTimeInMinutes = parseInt(firstTimeParts[0]) * 60 + parseInt(firstTimeParts[1]);
    const secondTimeInMinutes = parseInt(secondTimeParts[0]) * 60 + parseInt(secondTimeParts[1]);

    const firstEndTimeInMinutes = firstTimeInMinutes + firstTime.duration;
    const secondEndTimeInMinutes = secondTimeInMinutes + secondTime.duration;

    return firstTimeInMinutes < secondEndTimeInMinutes && secondTimeInMinutes < firstEndTimeInMinutes;
}
export const equalArs = (array1, array2) => {
    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
}

export const removeDuplicatesById = (array) => {
    const uniqueArray = array.filter((item, index, self) => {
        return index === self.findIndex(obj => obj.id === item.id);
    });
    return uniqueArray;
}

export const getEvents = (myTeachers, day) => {
    if (!myTeachers || !day) return []
    let theEvents = myTeachers?.filter((x, i) => {
        return x.schedule?.days.map(y => y.toLowerCase()).includes(day.toLowerCase())
    }).map((x, i) => {
        return { eventTime: x.schedule?.hours.timeIn24Format, duration: x.schedule?.hours.duration, teacherId: x.id, ...x }
    })
    return theEvents
}

export const getEventsDuration = (userInfo) => {
    if (!userInfo) return []
    let eventsDuration = teachers.filter(x => userInfo?.myTeachers.find(y => y.id === x.id)
    ).map(item => ({ teacherID: item.id, studyingYear: item.studyingYear, midYearHoliday: item.midYearHoliday }))
    return eventsDuration
}

export const isDateAfter = (dateString, comparisonDate) => {
    const dateParts = dateString.split("-");
    const year = new Date().getFullYear();
    const date = new Date(year, parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    const comparisonParts = comparisonDate.split("-");
    const comparison = new Date(year, parseInt(comparisonParts[0]) - 1, parseInt(comparisonParts[1]));

    return date > comparison;
}
export const getStartedEvents = (events, eventsDuration, selectedDay) => {
    let theEvents = events.filter(event => {
        let eventDuration = eventsDuration?.find(x => x.teacherID === event.teacherId);
        let isTheYearStarts = eventDuration && isDateAfter(selectedDay.id, eventDuration.studyingYear.start)
        return isTheYearStarts
    })
    return theEvents;
}