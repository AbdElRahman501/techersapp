import { days } from "../data";

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


export const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression to validate phone number (simplified)
    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    return phoneRegex.test(phoneNumber);
}

export const inputChecker = (inputValue, inputType) => {
    if (inputType === 'emailOrPhoneNumber') {
        if (!inputValue?.trim()) {
            return {
                error: {
                    inputType, message: {
                        ar: 'برجاء قم بإدخال البريد الإلكتروني أو رقم الجوال',
                        en: 'Please enter your email or phone number'
                    }
                }
            };
        } else if (!validateEmail(inputValue) && !isValidPhoneNumber(inputValue)) {
            return {
                error: {
                    inputType, message: {
                        ar: 'برجاء قم بإدخال البريد الإلكتروني أو رقم الجوال صحيح',
                        en: 'Please enter a valid email or valid phone number'
                    }
                }
            };
        }
    } else if (inputType === 'email') {
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
        const englishRegex = /^[A-Za-z0-9]*$/;
        if (!inputValue?.trim()) {
            return {
                error: {
                    inputType, message: {
                        ar: 'أدخل كلمة المرور',
                        en: 'Please enter your password'
                    }
                }
            };
        } else if (!englishRegex.test(inputValue) || inputValue.length < 6) {
            return {
                error: {
                    inputType, message: {
                        ar: 'كلمة المرور يجب أن يحتوي على 6 أحرف على الأقل',
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
    } else if (inputType === 'gender') {
        if (!inputValue?.trim()) {
            return {
                error: {
                    inputType, message: {
                        ar: 'اختر الجنس',
                        en: 'Choose gender'
                    }
                }
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

export const getErrorMessage = (error) => {
    switch (error.message) {
        case "this email already exists":
            return {
                message: {
                    ar: 'هذا البريد الالكتروني موجود بالفعل',
                    en: 'this email already exists'
                }
            };
        case "this phoneNumber already exists":
            return {
                message: {
                    title: {
                        ar: 'هذا الرقم مستخدم بالفعل',
                        en: 'this phone number already exists'
                    }, content: {
                        ar: 'هناك حساب مسجل بالفعل بهذا الرقم. هل تريد تسجيل الدخول؟ او استخدام رقو اخر',
                        en: 'There is an account already registered with this phone number. Do you want to login? Or use the last one'
                    }
                }
            };
        case "User not found or incorrect password":
            return {
                message: {
                    ar: 'الحساب غير موجود أو كلمة المرور غير صحيحة',
                    en: 'User not found or incorrect password'
                }
            }
        default:
            return error;
    }

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

export const formatDistance = (distance, lang, index) => {
    if (distance >= 1000) {
        const kilometers = distance / 1000;
        return kilometers.toFixed(index || 0) + (lang === 'ar' ? ' كم' : ' km');
    } else {
        return distance + (lang === 'ar' ? ' م' : ' m');
    }
};
export const checkArrayForUserId = (array, userId) => {
    if (!array || !array.length) return false
    return array.some((item) => item.id === userId);
};

export const getTitle = (gender, name) => {
    if (!name) return '';
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
    if (!subject) return '';
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

export const searchEngin = (array, value) => {
    if (value) {

        return (array.filter(item => item.name.toLowerCase().includes(value.toLowerCase())))
    } else {
        return array
    }

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

    const currentMonthIndex = new Date().getMonth();
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
export const sortArrayByTime = (array) => {
    return array.sort((a, b) => {
        const timeA = a.timeIn24Format.split(':');
        const timeB = b.timeIn24Format.split(':');

        const hourA = parseInt(timeA[0]);
        const minuteA = parseInt(timeA[1]);

        const hourB = parseInt(timeB[0]);
        const minuteB = parseInt(timeB[1]);

        if (hourA < hourB) {
            return -1;
        } else if (hourA > hourB) {
            return 1;
        } else {
            if (minuteA < minuteB) {
                return -1;
            } else if (minuteA > minuteB) {
                return 1;
            } else {
                return 0;
            }
        }
    });
}

export const transformTime = (time, language) => {
    const [hour, minute] = typeof time === 'string' ? time.split(':') : [time, "00"];
    let convertedHour = parseInt(hour);
    let period = language === 'ar' ? 'ص' : 'AM';

    if (convertedHour >= 12) {
        period = language === 'ar' ? 'م' : 'PM';
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
export const areAppointmentsOverlapping = (firstTime, secondTime) => {
    const firstTimeParts = firstTime.timeIn24Format.split(":");
    const secondTimeParts = secondTime.timeIn24Format.split(":");

    const firstTimeInMinutes = parseInt(firstTimeParts[0]) * 60 + parseInt(firstTimeParts[1]);
    const secondTimeInMinutes = parseInt(secondTimeParts[0]) * 60 + parseInt(secondTimeParts[1]);

    const firstEndTimeInMinutes = firstTimeInMinutes + firstTime.duration;
    const secondEndTimeInMinutes = secondTimeInMinutes + secondTime.duration;

    return firstTimeInMinutes < secondEndTimeInMinutes && secondTimeInMinutes < firstEndTimeInMinutes;
}
export const areGroupsOverLapped = (myGroups, myGroup) => {
    if (myGroups?.length === 0 || !myGroup) {
        return { overLapped: false, overlappedTime: "" };
    }
    let allDays = myGroups.map(group => group.days.map(x => ({ ...x, teacherId: group.teacherId, groupId: group.id }))).flat()
    let myDays = myGroup.days
    let overLapped = false
    let overlappedTime = {}
    allDays.map(day => {
        let theDay = myDays.find(y => y.day === day.day)
        if (theDay && areAppointmentsOverlapping(day, theDay)) {
            overLapped = true
            overlappedTime = day
        }
    })
    return { overLapped, overlappedTime };
}

export const getBookedMessage = (group, language) => {
    if (!group || !language) {
        return "";
    }
    let myDays = days.filter(x => group.days.map(y => y.day).includes(x.fullName)).map(x => x.day[language])
    let hours = group.days.map(x => transformTime(x.timeIn24Format, language))
    let message = ""
    if (hours.every(x => x === hours[0])) {
        let theDays = myDays.join(language === 'en' ? ' and ' : ' و ')
        message = language === "en"
            ? `${theDays} at ${hours[0]}`
            : ` ${theDays} الساعة ${hours[0]}`
    } else {
        for (let i = 0; i < myDays.length; i++) {
            const day = myDays[i];
            const hour = hours[i];
            message = message + (language === "en"
                ? ((i > 0 ? ' and ' : '') + `${day} at ${hour}`)
                : ((i > 0 ? ' و ' : '') + `${day} الساعة ${hour}`))
        }
    }
    return message
}

export const removeDuplicatesById = (array) => {
    if (!array?.length) return []
    const uniqueArray = array.filter((item, index, self) => {
        return index === self.findIndex(obj => obj?.id === item?.id);
    });
    return uniqueArray;
}
export const removeDuplicates = (arr) => {
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) {
            unique.push(arr[i]);
        }
    }
    return unique;
}
export const getColor = (colorArr) => {
    const colors = ["#8fc0a9", "#c8d5b9", "#8BAB98", "#5D9678", "#C2B99F", "#EBCEA0", '#81b29a', '#ccdd99', '#E9C46A', '#99cc99']
    let color = colors[Math.floor(Math.random() * colors.length)]
    while (colorArr?.includes(color) && colorArr?.length < colors.length) {
        color = colors[Math.floor(Math.random() * colors.length)]
    }
    return color;
}

export const getEvents = (myGroups, day) => {
    if (!myGroups?.length) return []
    let theEvents = myGroups.map(group => group.days.map(x => ({ ...x, teacherId: group.teacherId, groupId: group.id, subject: group.subject, color: group.color }))).flat().filter(x => x.day.toLowerCase() === day.toLowerCase())
    return theEvents
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
    if (!events?.length || !eventsDuration[0]?.studyingYear) return []
    let theEvents = events.filter(event => {
        let eventDuration = eventsDuration?.find(x => x.teacherID === event.teacherId);
        let isTheYearStarts = eventDuration && isDateAfter(selectedDay.id, eventDuration.studyingYear.start)
        return isTheYearStarts
    })
    return theEvents;
}
export const isDataExpired = (storedTime, duration) => {
    const expirationTime = new Date(storedTime);
    expirationTime.setSeconds(expirationTime.getSeconds() + duration);
    const currentTime = new Date();
    return expirationTime < currentTime;
}
export const getTheYear = (years, yearValue) => {
    if (!years?.length || !yearValue) return {
        ar: 'لا يوجد', en: 'No data',
    }
    return years.find(x => x.en === yearValue)
}
export const getSubject = (subjects, subjectTitle) => {
    if (!subjects?.length || !subjectTitle) return {
        ar: 'لا يوجد', en: 'No data',
    }
    const subject = subjects.find(x => x.en === subjectTitle)
    return subject
}
export const getTheEducation = (schoolTypes, educationTypeValue) => {
    if (!schoolTypes?.length || !educationTypeValue) return {
        ar: 'لا يوجد', en: 'No data',
    }
    return schoolTypes.find(x => x.en === educationTypeValue)
}