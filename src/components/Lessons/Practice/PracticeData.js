// import img1 from "/public/images/story1.jpg";
// import img2 from "/public/images/story2.jpg";
// import img3 from "/public/images/story3.jpg";
// import img4 from "/public/images/story4.jpg";
// import img5 from "/public/images/story5.jpg";
// import img6 from "/public/images/story6.jpg";
// import img7 from "/public/images/story7.jpg";
// import img8 from "/public/images/story8.jpg";
// import img9 from "/public/images/story9.jpg";
// import img10 from "/public/images/story10.jpg";

// import audio1 from "/public/audio/story1.mp3";
// import audio2 from "/public/audio/story2.mp3";
// import audio3 from "/public/audio/story3.mp3";
// import audio4 from "/public/audio/story4.mp3";
// import audio5 from "/public/audio/story5.mp3";
// import audio6 from "/public/audio/story6.mp3";
// import audio7 from "/public/audio/story7.mp3";
// import audio8 from "/public/audio/story8.mp3";
// import audio9 from "/public/audio/story9.mp3";
// import audio10 from "/public/audio/story10.mp3";

export const lessonsData = [
  {
    id: "lesson_1",
    intro: {
      title: "Lesson 1 – Greetings",
      story: "Lina is a Moroccan girl who greets her neighbors and teachers every morning with a smile.",
      // image: img1,
      // audio: audio1
    },
    quiz: [
      { question: "شنو كتقول للناس فالصباح؟", options: ["Hello", "Goodbye", "Thanks"], answer: "Hello" },
      { question: "شنو كتقول باش تشكر واحد؟", options: ["Thanks", "Sorry", "Please"], answer: "Thanks" },
      { question: "شنو كتقول ملي كتودع واحد؟", options: ["Goodbye", "Hello", "See you"], answer: "Goodbye" }
    ],
    write: [
      { question: "كتب 'سلام'", answer: "Hello" },
      { question: "كتب 'شكراً'", answer: "Thanks" }
    ],
    tf: [
      { question: "'Hello' معناها سلام", answer: true },
      { question: "'Thanks' معناها وداعا", answer: false }
    ]
  },
  {
    id: "lesson_2",
    intro: {
      title: "Lesson 2 – Family",
      story: "Adam lives with his parents and sister. They share meals and stories in the evening.",
      // image: img2,
      // audio: audio2
    },
    quiz: [
      { question: "شنو الكلمة ديال 'ماما' بالإنجليزية؟", options: ["Mother", "Brother", "Friend"], answer: "Mother" },
      { question: "شنو الكلمة ديال 'خو' بالإنجليزية؟", options: ["Brother", "Sister", "Cousin"], answer: "Brother" },
      { question: "شنو الكلمة ديال 'بنت' بالإنجليزية؟", options: ["Daughter", "Son", "Aunt"], answer: "Daughter" }
    ],
    write: [
      { question: "كتب 'أب'", answer: "Father" },
      { question: "كتب 'أخت'", answer: "Sister" }
    ],
    tf: [
      { question: "'Brother' معناها خو", answer: true },
      { question: "'Mother' معناها بنت", answer: false }
    ]
  },
  {
    id: "lesson_3",
    intro: {
      title: "Lesson 3 – Numbers 1 to 5",
      story: "Sara counts apples at the market and practices numbers every day to help her mother.",
      // image: img3,
      // audio: audio3
    },
    quiz: [
      { question: "شنو الرقم 'واحد' بالإنجليزية؟", options: ["One", "Two", "Three"], answer: "One" },
      { question: "شنو الرقم 'ثلاثة' بالإنجليزية؟", options: ["Three", "Four", "Five"], answer: "Three" },
      { question: "شنو الرقم 'خمس' بالإنجليزية؟", options: ["Five", "Six", "Two"], answer: "Five" }
    ],
    write: [
      { question: "كتب 'واحد'", answer: "One" },
      { question: "كتب 'أربع'", answer: "Four" }
    ],
    tf: [
      { question: "'Two' هي جوج", answer: true },
      { question: "'Five' هي ثلاث", answer: false }
    ]
  },
  {
    id: "lesson_4",
    intro: {
      title: "Lesson 4 – Colors",
      story: "Youssef paints a small house and picks bright colors to make it happy and lively.",
      // image: img4,
      // audio: audio4
    },
    quiz: [
      { question: "شنو اللون ديال السما بالإنجليزية؟", options: ["Blue", "Red", "Green"], answer: "Blue" },
      { question: "شنو اللون ديال الدم بالإنجليزية؟", options: ["Red", "Blue", "Yellow"], answer: "Red" },
      { question: "شنو اللون ديال الورق الأبيض بالإنجليزية؟", options: ["White", "Black", "Brown"], answer: "White" }
    ],
    write: [
      { question: "كتب 'أخضر'", answer: "Green" },
      { question: "كتب 'أسود'", answer: "Black" }
    ],
    tf: [
      { question: "'Blue' معناها أزرق", answer: true },
      { question: "'White' معناها أحمر", answer: false }
    ]
  },
  {
    id: "lesson_5",
    intro: {
      title: "Lesson 5 – Food",
      story: "Khadija cooks bread and tea and loves to share food with her neighbors and friends.",
      // image: img5,
      // audio: audio5
    },
    quiz: [
      { question: "شنو الكلمة ديال 'خبز' بالإنجليزية؟", options: ["Bread", "Milk", "Rice"], answer: "Bread" },
      { question: "شنو الكلمة ديال 'شاي' بالإنجليزية؟", options: ["Tea", "Coffee", "Juice"], answer: "Tea" },
      { question: "شنو الكلمة ديال 'تفاحة' بالإنجليزية؟", options: ["Apple", "Banana", "Orange"], answer: "Apple" }
    ],
    write: [
      { question: "كتب 'حليب'", answer: "Milk" },
      { question: "كتب 'عشاء'", answer: "Dinner" }
    ],
    tf: [
      { question: "'Tea' هي شاي", answer: true },
      { question: "'Rice' هي تفاحة", answer: false }
    ]
  },
  {
    id: "lesson_6",
    intro: {
      title: "Lesson 6 – School",
      story: "Ibrahim goes to school every day. He studies, plays, and reads with his friends.",
      // image: img6,
      // audio: audio6
    },
    quiz: [
      { question: "شنو الكلمة ديال 'مدرسة' بالإنجليزية؟", options: ["School", "Hospital", "Market"], answer: "School" },
      { question: "شنو الكلمة ديال 'كتاب' بالإنجليزية؟", options: ["Book", "Bag", "Pen"], answer: "Book" },
      { question: "شنو الكلمة ديال 'أستاذ' بالإنجليزية؟", options: ["Teacher", "Student", "Driver"], answer: "Teacher" }
    ],
    write: [
      { question: "كتب 'قلم'", answer: "Pen" },
      { question: "كتب 'حقيبة'", answer: "Bag" }
    ],
    tf: [
      { question: "'Teacher' معناها أستاذ", answer: true },
      { question: "'Book' معناها سيارة", answer: false }
    ]
  },
  {
    id: "lesson_7",
    intro: {
      title: "Lesson 7 – Time and Day",
      story: "Nora checks the clock, wakes up early, and plans her day to study in the afternoon.",
      // image: img7,
      // audio: audio7
    },
    quiz: [
      { question: "شنو الكلمة ديال 'نهار' بالإنجليزية؟", options: ["Day", "Night", "Week"], answer: "Day" },
      { question: "شنو الكلمة ديال 'ليل' بالإنجليزية؟", options: ["Night", "Morning", "Hour"], answer: "Night" },
      { question: "شنو الكلمة ديال 'ساعة' بالإنجليزية؟", options: ["Hour", "Minute", "Second"], answer: "Hour" }
    ],
    write: [
      { question: "كتب 'صباح'", answer: "Morning" },
      { question: "كتب 'مساء'", answer: "Evening" }
    ],
    tf: [
      { question: "'Night' معناها ليل", answer: true },
      { question: "'Day' معناها ساعة", answer: false }
    ]
  },
  {
    id: "lesson_8",
    intro: {
      title: "Lesson 8 – Places",
      story: "Rachid walks to the market and the park and knows many places in his neighborhood.",
      // image: img8,
      // audio: audio8
    },
    quiz: [
      { question: "شنو الكلمة ديال 'سوق' بالإنجليزية؟", options: ["Market", "Park", "School"], answer: "Market" },
      { question: "شنو الكلمة ديال 'حديقة' بالإنجليزية؟", options: ["Park", "Hospital", "Bank"], answer: "Park" },
      { question: "شنو الكلمة ديال 'مستشفى' بالإنجليزية؟", options: ["Hospital", "Pharmacy", "Library"], answer: "Hospital" }
    ],
    write: [
      { question: "كتب 'بنك'", answer: "Bank" },
      { question: "كتب 'مكتبة'", answer: "Library" }
    ],
    tf: [
      { question: "'Market' هي سوق", answer: true },
      { question: "'Park' هي مطار", answer: false }
    ]
  },
  {
    id: "lesson_9",
    intro: {
      title: "Lesson 9 – Actions",
      story: "Omar helps his family at home. He eats, reads, and cleans to support others.",
      // image: img9,
      // audio: audio9
    },
    quiz: [
      { question: "شنو الكلمة ديال 'يأكل' بالإنجليزية؟", options: ["Eat", "Run", "Sleep"], answer: "Eat" },
      { question: "شنو الكلمة ديال 'يقرا' بالإنجليزية؟", options: ["Read", "Write", "Sing"], answer: "Read" },
      { question: "شنو الكلمة ديال 'يلعب' بالإنجليزية؟", options: ["Play", "Work", "Cook"], answer: "Play" }
    ],
    write: [
      { question: "كتب 'يمشي'", answer: "Walk" },
      { question: "كتب 'يلعب'", answer: "Play" }
    ],
    tf: [
      { question: "'Read' معناها يقرا", answer: true },
      { question: "'Eat' معناها يقرأ", answer: false }
    ]
  },
  {
    id: "lesson_10",
    intro: {
      title: "Lesson 10 – Emotions",
      story: "Meriem shares her feelings with friends. She says when she is happy or sad and listens carefully.",
      // image: img10,
      // audio: audio10
    },
    quiz: [
      { question: "شنو الكلمة ديال 'فرحان' بالإنجليزية؟", options: ["Happy", "Sad", "Angry"], answer: "Happy" },
      { question: "شنو الكلمة ديال 'حزين' بالإنجليزية؟", options: ["Sad", "Happy", "Tired"], answer: "Sad" },
      { question: "شنو الكلمة ديال 'خايف' بالإنجليزية؟", options: ["Afraid", "Calm", "Bored"], answer: "Afraid" }
    ],
    write: [
      { question: "كتب 'متعب'", answer: "Tired" },
      { question: "كتب 'معصب'", answer: "Angry" }
    ],
    tf: [
      { question: "'Happy' معناها فرحان", answer: true },
      { question: "'Sad' معناها مبسوط", answer: false }
    ]
  }
];
