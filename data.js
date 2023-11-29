import { Add_Icon } from './assets/icons/Icons';


export const addSubjectItem = {
    id: 10000,
    addButton: true,
    en: "Add Subject", ar: "إضافة مادة",
    imageSource: (props) => <Add_Icon {...props} />
}
export const info = [{
    id: 1,
    backgroundImageSource: require('./assets/onboardingBk1.png'),
    imageSource: require('./assets/image1.png'),
    title: {
        ar: "العثور على أقرب معلم للطلاب",
        en: "Find the Nearest Teachers for Students"
    },
    content: {
        ar: "يمكنك استخدام التطبيق للبحث عن معلم بالاسم أو المادة أو المنطقة",
        en: "The app can help you search for a teacher by name, subject, or location."
    }
}, {
    id: 2,
    backgroundImageSource: require('./assets/onboardingBk2.png'),
    imageSource: require('./assets/onboarding2.png'),
    title: {
        ar: "متابعة تقدم الأبناء للأهل",
        en: "Track Your Children's Progress for Parents"
    },
    content: {
        ar: "يمكن للأهل معرفة مواعيد الدروس والواجبات والامتحانات وحضور وغياب أولادهم",
        en: "The Al Ostaz App can help parents know their children's class schedules, homework, exams, and attendance."
    }
}, {
    id: 3,
    backgroundImageSource: require('./assets/onboardingBk3.png'),
    imageSource: require('./assets/onboarding3.png'),
    title: {
        ar: "إضافة فعاليات ومتابعة تقدم الطلاب للمعلمين",
        en: "Teachers Can Add Student Activities and Track Their Progress"
    },
    content: {
        ar: "يمكن للمعلمين إضافة واجبات ونتائج الامتحانات ومتابعة حضور ونتائج الطلاب ومدفوعاتهم المالية",
        en: "Teachers can add homework, exam grades, track student attendance, grades, and payments."
    }
}];
export const subjects = [
    { id: 1, ar: "فيزياء", en: "Physics", imageSource: require('./assets/subjects/physics.png') },
    { id: 2, ar: "رياضايات", en: "Math", imageSource: require('./assets/subjects/math.png') },
    { id: 3, ar: "انجليزي", en: "English", imageSource: require('./assets/subjects/english.png') },
    { id: 4, ar: "فن", en: "art", imageSource: require('./assets/subjects/english.png') },
    { id: 5, ar: "موسيقي", en: "music", imageSource: require('./assets/subjects/english.png') },
    { id: 6, ar: "كيمياء", en: "chemistry", imageSource: require('./assets/subjects/physics.png') },
    // {
    //     addButton: true,
    //     en: "Add Subject", ar: "إضافة مادة",
    //     svg: (props) => {
    //         return <Add_Icon height="80%" width="80%" viewBox="0 0 24 25" {...props} />
    //     }
    // }

]

export const years = [
    { id: 1, value: "1-sec", en: "First grade secondary", ar: "الصف الاول الثانوي" },
    { id: 2, value: "2-sec", en: "Second grade secondary", ar: "الصف الثاني الثانوي" },
    { id: 3, value: "3-sec", en: "Third grade secondary", ar: "الصف الثالث الثانوي" }
];

export const days = [
    {
        id: 1,
        day: { ar: "السبت", en: "Sat" },
        fullName: "saturday",
        date: 18,
        attend: true,
        late: false,
    },
    {
        id: 2,
        day: { ar: "الأحد", en: "Sun" },
        fullName: "sunday",
        date: 19,
        attend: true,
        late: false,

    },
    {
        id: 3,
        day: { ar: "الاثنين", en: "Mon" },
        fullName: "monday",
        date: 20,
        attend: false,
        late: false,

    },
    {
        id: 4,
        day: { ar: "الثلاثاء", en: "Tue" },
        fullName: "tuesday",
        date: 21,
        attend: true,
        late: true,

    },
    {
        id: 5,
        day: { ar: "الأربعاء", en: "Wen" },
        fullName: "wednesday",
        date: 22,
        attend: true,
        late: false,

    },
    {
        id: 6,
        day: { ar: "الخميس", en: "Thu" },
        fullName: "thursday",
        date: 23,
        attend: true,
        late: false,

    },
    {
        id: 7,
        day: { ar: "الجمعة", en: "Fri" },
        fullName: "friday",
        date: 24,
        attend: true,
        late: false,

    }
];
export const months = [
    {
        id: 1,
        month: { ar: "مايو", en: "Jun" },
        number: 6,
        payed: true
    },
    {
        id: 2,
        month: { ar: "يونيو", en: "Jul" },
        number: 7,
        payed: true
    },
    {
        id: 3,
        month: { ar: "اغسطس", en: "Aug" },
        number: 8,
        payed: false
    }

]

export const schoolTypes = [
    { en: "Public School", ar: "مدرسة حكومية" },
    { en: "Private School", ar: "مدرسة خاصة" },
    { en: "International School", ar: "مدرسة دولية" },
    { en: "Language School", ar: "مدرسة لغات" },
    { en: "Experimental School", ar: "مدرسة تجريبية" },
    { en: "Secondary Art School", ar: "مدرسة ثانوية فنية" },
    { en: "Gifted Students School", ar: "مدرسة متفوقين" },
    { en: "Al-Azhar School", ar: "مدرسة الازهر" },
];

export const friends = [
    {
        id: 1, name: 'John', distance: 10,
        imageSource: require('./assets/teachers/boy.png')
    },
    {
        id: 2, name: 'Alice', distance: 5,
        imageSource: require('./assets/teachers/boy.png')
    },
    {
        id: 3, name: 'Bob', distance: 8,
        imageSource: require('./assets/teachers/boy.png')
    },
    {
        id: 4, name: 'Emily', distance: 12,
        imageSource: require('./assets/teachers/boy.png')
    },
    // Add more friend objects as needed
];
