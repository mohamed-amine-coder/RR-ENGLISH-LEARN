
const imgPlaceholder = "https://placehold.co/600x400/0077ff/ffffff?text=Unit+Image";
export const lessonsData = [
  // --- Lesson 0: Onboarding (كيفاش تقرا معنا) ---
  {
    id: "lesson_0",
    intro: {
      title: "Unit 0 || هذا ماشي درس فقط، هادي مقدمة باش تعرف كيفاش تقرا معنا",
      // قصة بسيطة جداً تشرح طريقة العمل
      story: "Welcome! This is RR English. Here, we learn English simply. First, read the story. Next, listen to the audio. Then, answer the questions. Don't worry about mistakes. Making mistakes is good for learning. Are you ready? Let's start!",
      image: imgPlaceholder, // دير صورة فيها شعار المنصة أو شخص يرحب
      audio: "/PracticeAudios/unit0.mp3" // تسجيل بصوتك يشرح بالدارجة والإنجليزية
    },
    quiz: [
      { 
        question: "شنو هي أول خطوة باش تعلم هنا؟", 
        options: ["Read and Listen", "Sleep", "Close the app"], 
        answer: "Read and Listen" 
      },
      { 
        question: "واش مسموح تغلط فـ RR English؟", 
        options: ["No, never!", "Yes, mistakes are good", "I don't know"], 
        answer: "Yes, mistakes are good" 
      },
      { 
        question: "شنو اللغة باش كنشرحو ليك؟", 
        options: ["Japanese", "Darija & English", "Only French"], 
        answer: "Darija & English" 
      }
    ],
    write: [
      { 
        question: "باش تبدا، كتب كلمة 'Start' لتحت", 
        answer: "Start" 
      },
      { 
        question: "كتب سمية المنصة 'RR'", 
        answer: "RR" 
      }
    ],
    tf: [
      { 
        question: "This platform is for learning French.", 
        answer: false // تأكد واش الكود ديالك كيقبل true/false كـ Boolean ولا String
      },
      { 
        question: "You can learn English here.", 
        answer: true 
      }
    ]
  },
  // --- Unit 1: Introductions ---
  {
    id: "unit_1",
    intro: {
      title: "Unit 1 – Hello, New Friend!",
      story: "Hello! I am Ali. I am from Morocco. I am a student. I am twenty years old. This is my friend, Sara. She is nice. We are happy here. We want to learn English. It is a good language. Thank you very much. Goodbye and see you soon!",
      image: imgPlaceholder,
      audio: "/PracticeAudios/unit1.mp3"
    },
    quiz: [
      { question: "شحال في عمر علي؟", options: ["10 years", "20 years", "30 years"], answer: "20 years" },
      { question: "منين هو علي؟", options: ["Egypt", "France", "Morocco"], answer: "Morocco" },
      { question: "شنو كيدير علي في حياتو؟", options: ["He is a teacher", "He is a student", "He is a doctor"], answer: "He is a student" }
    ],
    write: [
      { question: "كتب 'صديق' بالإنجليزية", answer: "Friend" },
      { question: "كتب 'طالب' بالإنجليزية", answer: "Student" }
    ],
    tf: [
      { question: "Ali is thirty years old.", answer: "False" },
      { question: "Sara is Ali's friend.", answer: "True" }
    ]
  },

  // --- Unit 2: Family ---
  {
    id: "unit_2",
    intro: {
      title: "Unit 2 – My Family",
      story: "I love my family very much. My father is Ahmed. He is a good man. My mother is Fatima. She cooks good food. I have one brother and one sister. We live in a small house. We are very happy together. On Friday, we eat couscous. My family is my life.",
      image: imgPlaceholder,
      audio: "/PracticeAudios/unit2.mp3"
    },
    quiz: [
      { question: "شنو سميت الأب ديالو؟", options: ["Omar", "Ahmed", "Ali"], answer: "Ahmed" },
      { question: "شنو كياكلو نهار الجمعة؟", options: ["Pizza", "Tacos", "Couscous"], answer: "Couscous" },
      { question: "كيفاش دايرة الدار فين ساكنين؟", options: ["Big house", "Small house", "Apartment"], answer: "Small house" }
    ],
    write: [
      { question: "كتب 'أم' بالإنجليزية", answer: "Mother" },
      { question: "كتب 'أخ' بالإنجليزية", answer: "Brother" }
    ],
    tf: [
      { question: "His mother is named Fatima.", answer: "True" },
      { question: "He has three brothers.", answer: "False" }
    ]
  },

  // --- Unit 3: Home ---
  {
    id: "unit_3",
    intro: {
      title: "Unit 3 – My Home",
      story: "Welcome to my home. It is not big, but it is nice. The living room has a blue sofa and a TV. We watch movies there. My bedroom has a bed and a desk. I sleep and study there. The kitchen is clean. We eat lunch at 2:00 PM. I feel safe and warm in my house. It is a great place for me.",
      image: imgPlaceholder,
      audio: "/PracticeAudios/unit3.mp3"
    },
    quiz: [
      { question: "شنو اللون ديال السداري (sofa)؟", options: ["Red", "Blue", "Black"], answer: "Blue" },
      { question: "معاش كيتغداو؟", options: ["1:00 PM", "2:00 PM", "3:00 PM"], answer: "2:00 PM" },
      { question: "فين كينعس ويقرا؟", options: ["Kitchen", "Living room", "Bedroom"], answer: "Bedroom" }
    ],
    write: [
      { question: "كتب 'مطبخ' بالإنجليزية", answer: "Kitchen" },
      { question: "كتب 'مكتب' بالإنجليزية", answer: "Desk" }
    ],
    tf: [
      { question: "The house is very big.", answer: "False" },
      { question: "The kitchen is clean.", answer: "True" }
    ]
  },

  // --- Unit 4: Routine ---
  {
    id: "unit_4",
    intro: {
      title: "Unit 4 – My Day",
      story: "Every day, I wake up at 7:00 AM. I wash my face and brush my teeth. I eat bread and drink tea for breakfast. Then, I go to the university by bus. I study hard in class. At 1:00 PM, I eat lunch with my friends. In the evening, I go back home. I do my homework and help my mom. I watch a little TV, then I go to sleep at 11:00 PM.",
      image: imgPlaceholder,
      audio: "/PracticeAudios/unit4.mp3"
    },
    quiz: [
      { question: "معاش كيفيق الصباح؟", options: ["6:00 AM", "7:00 AM", "8:00 AM"], answer: "7:00 AM" },
      { question: "باش كيمشي للجامعة؟", options: ["By car", "By bus", "On foot"], answer: "By bus" },
      { question: "شنو كيدير قبل ما ينعس؟", options: ["Watches TV", "Plays football", "Cooks dinner"], answer: "Watches TV" }
    ],
    write: [
      { question: "كتب 'فطور' بالإنجليزية", answer: "Breakfast" },
      { question: "كتب 'وجه' بالإنجليزية", answer: "Face" }
    ],
    tf: [
      { question: "He drinks coffee for breakfast.", answer: "False" },
      { question: "He sleeps at 11:00 PM.", answer: "True" }
    ]
  },

  // --- Unit 5: Jobs ---
  {
    id: "unit_5",
    intro: {
      title: "Unit 5 – Jobs and Work",
      story: "Work is very important in life. My uncle is a doctor. He helps sick people at the hospital. My aunt is a teacher in a school. She loves kids. I want to be a manager one day. I want to work in a big office. A good job gives you money and a good life. You must study hard now to find a good job later. Many people work in shops, banks, or online. Every job is good if you work hard.",
      image: imgPlaceholder,
      audio: "/PracticeAudios/unit5.mp3"
    },
    quiz: [
      { question: "شنو هي الخدمة ديال خالو/عمو؟", options: ["Teacher", "Doctor", "Manager"], answer: "Doctor" },
      { question: "فين باغي يخدم هو من بعد؟", options: ["In a school", "In a hospital", "In a big office"], answer: "In a big office" },
      { question: "علاش خاصك تقرا مزيان دابا؟", options: ["To find a good job", "To sleep more", "To watch TV"], answer: "To find a good job" }
    ],
    write: [
      { question: "كتب 'مستشفى' بالإنجليزية", answer: "Hospital" },
      { question: "كتب 'مال/فلوس' بالإنجليزية", answer: "Money" }
    ],
    tf: [
      { question: "His aunt is a teacher.", answer: "True" },
      { question: "He wants to be a doctor.", answer: "False" }
    ]
  },

  // --- Unit 6: Food ---
  {
    id: "unit_6",
    intro: {
      title: "Unit 6 – Food and Drink",
      story: "Food is very important for our body. I eat three meals every day: breakfast, lunch, and dinner. For breakfast, I like milk and bread with olive oil. It gives me energy. For lunch, my favorite dish is chicken with potatoes. It is very delicious. I also like to eat fresh salad and green apples. We must drink a lot of water every day because it is good for health. On the weekend, we sometimes eat pizza or fish outside. Good food makes you strong and happy.",
      image: imgPlaceholder,
      audio: "/PracticeAudios/unit6.mp3"
    },
    quiz: [
      { question: "شحال من وجبة كياكل فنهار؟", options: ["Two meals", "Three meals", "Four meals"], answer: "Three meals" },
      { question: "شنو عزيز عليه فالفطور؟", options: ["Eggs and cheese", "Milk and bread", "Pizza"], answer: "Milk and bread" },
      { question: "علاش خاصنا نشربو الماء؟", options: ["It is good for health", "It tastes sweet", "It is expensive"], answer: "It is good for health" }
    ],
    write: [
      { question: "كتب 'دجاج' بالإنجليزية", answer: "Chicken" },
      { question: "كتب 'ماء' بالإنجليزية", answer: "Water" }
    ],
    tf: [
      { question: "He eats pizza every day.", answer: "False" },
      { question: "His favorite lunch is chicken with potatoes.", answer: "True" }
    ]
  },

  // --- Unit 7: Clothes ---
  {
    id: "unit_7",
    intro: {
      title: "Unit 7 – Clothes and Colors",
      story: "I like to wear comfortable clothes. In the summer, the weather is hot, so I wear a white T-shirt and blue shorts. I also wear sunglasses to protect my eyes. In the winter, it is cold and rainy. I wear a heavy black jacket, long pants, and warm boots. My sister loves colors. She has a red dress and a yellow scarf. When we go to a wedding, men wear a traditional Djellaba and women wear a Kaftan. Buying new clothes is fun, but you do not need expensive brands to look good. Clean clothes are the best.",
      image: imgPlaceholder,
      audio: "/PracticeAudios/unit7.mp3"
    },
    quiz: [
      { question: "شنو كيلبس فالصيف؟", options: ["Black jacket", "White T-shirt", "Heavy boots"], answer: "White T-shirt" },
      { question: "شنو كيلبسوا الرجال فالعرس؟", options: ["Suit", "Djellaba", "Jeans"], answer: "Djellaba" },
      { question: "شنو أهم حاجة فالحوايج؟", options: ["Expensive brands", "Clean clothes", "Many colors"], answer: "Clean clothes" }
    ],
    write: [
      { question: "كتب 'شتاء' بالإنجليزية", answer: "Winter" },
      { question: "كتب 'فستان/كسوة' بالإنجليزية", answer: "Dress" }
    ],
    tf: [
      { question: "He wears sunglasses in winter.", answer: "False" },
      { question: "His sister likes colors.", answer: "True" }
    ]
  },

  // --- Unit 8: City ---
  {
    id: "unit_8",
    intro: {
      title: "Unit 8 – My City",
      story: "I live in a beautiful city in Morocco. It has many old buildings and a big market. In the center of the city, there is a large mosque and a nice park. Many tourists visit my city to take photos and eat local food. The streets are busy in the morning. People go to work by bus, taxi, or car. To go to the train station, you go straight and turn right. It is not far from my house. I like my city because the people are kind and friendly. We help each other. It is a wonderful place to live.",
      image: imgPlaceholder,
      audio: "/PracticeAudios/unit8.mp3"
    },
    quiz: [
      { question: "شنو كاين فوسط المدينة؟", options: ["A beach", "A large mosque", "A mountain"], answer: "A large mosque" },
      { question: "كيفاش كيمشيو الناس للخدمة؟", options: ["By plane", "By boat", "By bus, taxi, or car"], answer: "By bus, taxi, or car" },
      { question: "علاش عزيزة عليه مدينتو؟", options: ["People are friendly", "It is very big", "It has no cars"], answer: "People are friendly" }
    ],
    write: [
      { question: "كتب 'سوق' بالإنجليزية", answer: "Market" },
      { question: "كتب 'شارع' بالإنجليزية", answer: "Street" }
    ],
    tf: [
      { question: "The train station is far away.", answer: "False" },
      { question: "Tourists visit to take photos.", answer: "True" }
    ]
  },

  // --- Unit 9: Health ---
  {
    id: "unit_9",
    intro: {
      title: "Unit 9 – Health and Body",
      story: "Health is the most important thing in life. We have one body, so we must take care of it. I have two eyes to see, two ears to hear, and two legs to walk. To stay healthy, I do exercise three times a week. I like to run in the morning. If you feel sick or have a fever, you must go to the doctor. The doctor gives you medicine to feel better. You should also brush your teeth every night and wash your hands before eating. Sleeping for eight hours is also very important for your brain and body.",
      image: imgPlaceholder,
      audio: "/PracticeAudios/unit9.mp3"
    },
    quiz: [
      { question: "شحال من مرة كيدير الرياضة؟", options: ["Every day", "Three times a week", "Once a month"], answer: "Three times a week" },
      { question: "شنو خاصك دير يلا مرضتي؟", options: ["Go to the doctor", "Eat pizza", "Go to school"], answer: "Go to the doctor" },
      { question: "شحال خاصنا نعسو من ساعة؟", options: ["5 hours", "8 hours", "12 hours"], answer: "8 hours" }
    ],
    write: [
      { question: "كتب 'طبيب' بالإنجليزية", answer: "Doctor" },
      { question: "كتب 'دواء' بالإنجليزية", answer: "Medicine" }
    ],
    tf: [
      { question: "We use our ears to see.", answer: "False" },
      { question: "Washing hands is important.", answer: "True" }
    ]
  },

  // --- Unit 10: School ---
  {
    id: "unit_10",
    intro: {
      title: "Unit 10 – School and Learning",
      story: "School is the place where we learn new things every day. I go to school from Monday to Friday. My backpack has my books, notebooks, and pens. My favorite subject is English because I want to speak with people from other countries. I also like Science and History. My teachers are very helpful and smart. They want us to succeed. In the classroom, we must listen and be quiet. During the break, I play with my classmates in the yard. Education is the key to a good future. If you study hard now, you can have a great job later. Learning never stops.",
      image: imgPlaceholder,
      audio: "/PracticeAudios/unit10.mp3"
    },
    quiz: [
      { question: "أشنو هي المادة المفضلة ديالو؟", options: ["Math", "English", "Sport"], answer: "English" },
      { question: "شنو كيهز فالمحفظة ديالو؟", options: ["Toys", "Food", "Books and pens"], answer: "Books and pens" },
      { question: "كيفاش دايرين الأساتذة ديالو؟", options: ["Helpful and smart", "Angry", "Lazy"], answer: "Helpful and smart" }
    ],
    write: [
      { question: "كتب 'مستقبل' بالإنجليزية", answer: "Future" },
      { question: "كتب 'أستاذ' بالإنجليزية", answer: "Teacher" }
    ],
    tf: [
      { question: "He goes to school on Sunday.", answer: "False" },
      { question: "He plays in the yard during the break.", answer: "True" }
    ]
  },
  
  // ... (Units 11 to 20 continue below)
];