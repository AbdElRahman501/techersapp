export const subjects = [
    { id: 1, title: { ar: "فيزياء", en: "Physics" }, imageSource: require('./assets/subjects/physics.png') },
    { id: 2, title: { ar: "رياضايات", en: "Math" }, imageSource: require('./assets/subjects/math.png') },
    { id: 3, title: { ar: "انجليزي", en: "English" }, imageSource: require('./assets/subjects/english.png') },
]
export const teachers = [
    {
        id: 1,
        imageSource: require('./assets/teachers/teacher.png'),
        name: "Ahmed",
        mainSubject: "physics",
        subjects: ["physics", "math"]
    },
    {
        id: 2,
        imageSource: require('./assets/teachers/teacher.png'),
        name: "mohamed",
        mainSubject: "english",
        subjects: ["english", "math"]
    },
    {
        id: 3,
        imageSource: require('./assets/teachers/teacher.png'),
        name: "مسعد",
        mainSubject: "science",
        subjects: ["science", "frinch"]
    },
];
export const days = [
    {
        id: 1,
        day: { ar: "السبت", en: "Sat" },
        date: 18,
        attend: true,
        late: false,
    },
    {
        id: 2,
        day: { ar: "الأحد", en: "Sun" },
        date: 19,
        attend: true,
        late: false,

    },
    {
        id: 3,
        day: { ar: "الاثنين", en: "Mon" },
        date: 20,
        attend: false,
        late: false,

    },
    {
        id: 4,
        day: { ar: "الثلاثاء", en: "Tue" },
        date: 21,
        attend: true,
        late: true,

    },
    {
        id: 5,
        day: { ar: "الأربعاء", en: "Wen" },
        date: 22,
        attend: true,
        late: false,

    },
    {
        id: 6,
        day: { ar: "الخميس", en: "Thu" },
        date: 23,
        attend: true,
        late: false,

    },
    {
        id: 7,
        day: { ar: "الجمعة", en: "Fri" },
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
export const years = [
    { en: "first", ar: "الصف الاول" },
    { en: "first", ar: "الصف الاول" },
    { en: "first", ar: "الصف الاول" },
    { en: "first", ar: "الصف الاول" }];
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