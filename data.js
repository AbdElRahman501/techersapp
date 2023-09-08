
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
]

export const years = [
    { id: 1, en: "First grade secondary", ar: "الصف الاول الثانوي" },
    { id: 2, en: "Second grade secondary", ar: "الصف الثاني الثانوي" },
    { id: 3, en: "Third grade secondary", ar: "الصف الثالث الثانوي" }
];
export const teachers = [
    {
        id: 1,
        imageSource: require('./assets/teachers/teacher.png'),
        name: "Ahmed Mohamed",
        mainSubject: { ...subjects[0], schoolYears: [years[0], years[1], years[2]] },
        subjects: [{ ...subjects[0], schoolYears: [years[0], years[1], years[2]] }, { ...subjects[1], schoolYears: [years[0]] }],
        distance: 1200,
        gender: "male",
        about: `this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about`,
        price: 300,
        likes: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
        ],
    },
    {
        id: 2,
        imageSource: require('./assets/teachers/teacher.png'),
        name: "Mohamed Ahmed",
        mainSubject: { ...subjects[0], schoolYears: [years[0], years[1], years[2]] },
        subjects: [{ ...subjects[0], schoolYears: [years[0], years[1], years[2]] }, { ...subjects[1], schoolYears: [years[0]] }],
        gender: "male",
        distance: 800,
        about: `this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about`,
        price: 200,
        likes: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 }
        ]

    },
    {
        id: 3,
        imageSource: require('./assets/teachers/teacher.png'),
        name: "مسعد سعيد",
        mainSubject: { ...subjects[0], schoolYears: [years[0], years[1], years[2]] },
        subjects: [{ ...subjects[0], schoolYears: [years[0], years[2]] }, { ...subjects[1], schoolYears: [years[2]] }],
        gender: "male",
        distance: 11500,
        about: `هذه نبذة هذه نبذة هذه نبذة هذه نبذة هذه نبذة هذه نبذة هذه نبذة هذه نبذة هذه نبذة هذه نبذة هذه نبذة  هذه نبذة `,
        price: 400,
        likes: [
            { id: 1 },

        ]

    },
    {
        id: 4,
        imageSource: require('./assets/teachers/teacher.png'),
        name: "Amira Ahmed",
        mainSubject: { ...subjects[3], schoolYears: [years[0], years[1], years[2]] },
        subjects: [{ ...subjects[3], schoolYears: [years[0], years[1], years[2]] }, { ...subjects[0], schoolYears: [years[0]] }],
        gender: "female",
        distance: 11500,
        about: `this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about`,
        price: 220,
        likes: [
            { id: 1 },
            { id: 18 },

        ]

    },
    {
        id: 5,
        imageSource: require('./assets/teachers/teacher.png'),
        name: "Shahinda Abdelrahman",
        mainSubject: { ...subjects[4], schoolYears: [years[0], years[1], years[2]] },
        subjects: [{ ...subjects[4], schoolYears: [years[0], years[1], years[2]] }, { ...subjects[3], schoolYears: [years[0], years[1], years[2]] }],
        gender: "female",
        distance: 250,
        about: `this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about this is about`,
        price: 220,
        likes: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 18 }

        ]

    },
];
export const userData = {
    "address": "banha",
    "birthDay": "06/18/2000",
    "educationType": { "ar": "مدرسة حكومية", "en": "Public School" },
    "email": "abdelrahman.6182@gmail.com",
    "fullName": "Abdelrahman Ahmed",
    "parentPhoneNumber": "01015753392",
    "password": "bedo4ahmed", "phoneNumber": "01015753392",
    "policy": true,
    "schoolYear": { "id": 1, "en": "First grade secondary", "ar": "الصف الاول الثانوي" },
    "user": "student",
    myFavTeachers: [
        { id: 4 },
        { id: 5 },
    ],
    myTeachers: [
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
    ]
}
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

export const hours = [
    { "id": 4, "time": "9:00 AM", "timeIn24Format": "9:00AM" },
    { "id": 7, "time": "12:00 PM", "timeIn24Format": "12:00PM" },
    { "id": 9, "time": "2:00 PM", "timeIn24Format": "2:00PM" },
    { "id": 10, "time": "3:00 PM", "timeIn24Format": "3:00PM" },
    { "id": 12, "time": "5:00 PM", "timeIn24Format": "5:00PM" },
    { "id": 13, "time": "6:00 PM", "timeIn24Format": "6:00PM" },
    { "id": 15, "time": "8:00 PM", "timeIn24Format": "8:00PM" }
]

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
