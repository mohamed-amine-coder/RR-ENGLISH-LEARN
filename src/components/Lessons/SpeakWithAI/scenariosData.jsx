import { 
  FaCoffee, FaStethoscope, FaTaxi, FaTshirt, FaStore, 
  FaCut, FaPlane, FaBed, FaWrench, FaUserFriends, 
  FaBriefcase, FaUserShield, FaHome, FaLandmark, 
  FaMapMarkedAlt, FaMotorcycle, FaCapsules, FaDumbbell, 
  FaChalkboardTeacher, FaTools, FaLock
} from 'react-icons/fa';
  
export const SCENARIOS = [
  { 
    id: 'waiter', 
    title: 'سيرفور فقهوة', 
    subtitle: 'Cafe Waiter', 
    icon: <FaCoffee />, 
    color: '#f59e0b', 
    screenshot: '/screenshots/waiter.png', 
    systemInstruction: 'You are a Waiter in a cafe in London. The user is a customer.', 
    initialMessage: 'Hello! Welcome to our cafe. What can I get for you today?' 
  },
  { 
    id: 'doctor', 
    title: 'طبيب', 
    subtitle: 'Doctor', 
    icon: <FaStethoscope />, 
    color: '#ef4444', 
    screenshot: '/screenshots/doctor.png', 
    systemInstruction: 'You are a Doctor. The user is a patient.', 
    initialMessage: 'Good morning. How can I help you today? What seem to be your symptoms?' 
  },
  { 
    id: 'taxi', 
    title: 'مول الطاكسي', 
    subtitle: 'Taxi Driver', 
    icon: <FaTaxi />, 
    color: '#eab308', 
    screenshot: '/screenshots/taxi.png', 
    systemInstruction: 'You are a friendly Taxi Driver. The user is a passenger.', 
    initialMessage: 'Hello! Hop in. Where would you like to go today?' 
  },
  { 
    id: 'clothes_shop', 
    title: 'مول الحوايج', 
    subtitle: 'Clothes Shop Assistant', 
    icon: <FaTshirt />, 
    color: '#ec4899', 
    screenshot: '/screenshots/clothes.png', 
    systemInstruction: 'You are a shop assistant in a clothing store. The user is a customer looking to buy clothes.', 
    initialMessage: 'Hi there! Are you looking for anything in particular, or just browsing?' 
  },
  { 
    id: 'grocer', 
    title: 'مول الحانوت', 
    subtitle: 'Grocer / Shopkeeper', 
    icon: <FaStore />, 
    color: '#22c55e', 
    screenshot: '/screenshots/grocer.png', 
    systemInstruction: 'You are a local grocery store owner (shopkeeper). The user is buying daily items.', 
    initialMessage: 'Hello! Do you need help finding anything in the store?' 
  },
  { 
    id: 'barber', 
    title: 'حلاق / كوافور', 
    subtitle: 'Barber / Hairdresser', 
    icon: <FaCut />, 
    color: '#8b5cf6', 
    screenshot: '/screenshots/barber.png', 
    systemInstruction: 'You are a barber or hairdresser. The user is a customer who wants a haircut.', 
    initialMessage: 'Welcome! Have a seat. How would you like your hair cut today?' 
  },
  { 
    id: 'airport', 
    title: 'موظف فالمطار', 
    subtitle: 'Airport Check-in', 
    icon: <FaPlane />, 
    color: '#0ea5e9', 
    screenshot: '/screenshots/airport.png', 
    systemInstruction: 'You are an airport check-in desk agent. The user is a passenger travelling abroad.', 
    initialMessage: 'Good morning! Can I see your passport and flight ticket, please?' 
  },
  { 
    id: 'hotel', 
    title: 'ريسبسيون فلوطيل', 
    subtitle: 'Hotel Receptionist', 
    icon: <FaBed />, 
    color: '#6366f1', 
    screenshot: '/screenshots/hotel.png', 
    systemInstruction: 'You are a hotel receptionist. The user wants to check in or book a room.', 
    initialMessage: 'Welcome to the Grand Hotel! Do you have a reservation with us?' 
  },
  { 
    id: 'mechanic', 
    title: 'ميكانيسيان', 
    subtitle: 'Car Mechanic', 
    icon: <FaWrench />, 
    color: '#64748b', 
    screenshot: '/screenshots/mechanic.png', 
    systemInstruction: 'You are a car mechanic. The user brought their car for repair.', 
    initialMessage: 'Hi there. What seems to be the problem with your car?' 
  },
  { 
    id: 'friend', 
    title: 'صاحبك أجنبي', 
    subtitle: 'Foreign Friend', 
    icon: <FaUserFriends />, 
    color: '#f43f5e', 
    screenshot: '/screenshots/friend.png', 
    systemInstruction: 'You are a close foreign friend of the user. You chat casually.', 
    initialMessage: 'Hey! It’s been a while. How have you been lately?' 
  },
  { 
    id: 'interviewer', 
    title: 'أونتروتيان د الخدمة', 
    subtitle: 'Job Interviewer', 
    icon: <FaBriefcase />, 
    color: '#1e40af', 
    screenshot: '/screenshots/interviewer.png', 
    systemInstruction: 'You are a hiring manager interviewing the user for a job.', 
    initialMessage: 'Hello, thank you for coming. Could you start by telling me a little about yourself?' 
  },
  { 
    id: 'police', 
    title: 'بوليسي', 
    subtitle: 'Police Officer', 
    icon: <FaUserShield />, 
    color: '#1e3a8a', 
    screenshot: '/screenshots/police.png', 
    systemInstruction: 'You are a police officer. The user is asking for help or reporting something.', 
    initialMessage: 'Excuse me. Is everything alright? How can I help you?' 
  },
  { 
    id: 'realestate', 
    title: 'سمسار', 
    subtitle: 'Real Estate Agent', 
    icon: <FaHome />, 
    color: '#14b8a6', 
    screenshot: '/screenshots/realestate.png', 
    systemInstruction: 'You are a real estate agent. The user is looking to rent or buy an apartment.', 
    initialMessage: 'Hello! Are you looking to rent or buy a property today?' 
  },
  { 
    id: 'bank', 
    title: 'موظف د البانكة', 
    subtitle: 'Bank Teller', 
    icon: <FaLandmark />, 
    color: '#059669', 
    screenshot: '/screenshots/bank.png', 
    systemInstruction: 'You are a bank teller. The user wants to open an account or withdraw money.', 
    initialMessage: 'Good morning. How can I assist you with your banking today?' 
  },
  { 
    id: 'tourist', 
    title: 'توريست كيسول', 
    subtitle: 'Lost Tourist', 
    icon: <FaMapMarkedAlt />, 
    color: '#d946ef', 
    screenshot: '/screenshots/tourist.png', 
    systemInstruction: 'You are a lost tourist asking the user for directions.', 
    initialMessage: 'Excuse me, sorry to bother you. Can you tell me how to get to the nearest train station?' 
  },
  { 
    id: 'delivery', 
    title: 'ليفرور', 
    subtitle: 'Delivery Guy', 
    icon: <FaMotorcycle />, 
    color: '#ea580c', 
    screenshot: '/screenshots/delivery.png', 
    systemInstruction: 'You are a food or package delivery driver calling the user.', 
    initialMessage: 'Hello, this is your delivery driver. I am outside your building, where should I leave the package?' 
  },
  { 
    id: 'pharmacy', 
    title: 'مول الفرمسيان', 
    subtitle: 'Pharmacist', 
    icon: <FaCapsules />, 
    color: '#10b981', 
    screenshot: '/screenshots/pharmacy.png', 
    systemInstruction: 'You are a pharmacist. The user wants to buy medicine.', 
    initialMessage: 'Hello. Do you have a prescription, or are you looking for over-the-counter medicine?' 
  },
  { 
    id: 'gym', 
    title: 'كوتش د لاصال', 
    subtitle: 'Gym Trainer', 
    icon: <FaDumbbell />, 
    color: '#334155', 
    screenshot: '/screenshots/gym.png', 
    systemInstruction: 'You are a gym fitness trainer. The user wants advice on working out.', 
    initialMessage: 'Hey there! Are you ready for a good workout today? What is your fitness goal?' 
  },
  { 
    id: 'teacher', 
    title: 'أستاذ', 
    subtitle: 'Teacher', 
    icon: <FaChalkboardTeacher />, 
    color: '#b45309', 
    screenshot: '/screenshots/teacher.png', 
    systemInstruction: 'You are a strict but helpful teacher. The user is your student.', 
    initialMessage: 'Good morning class. Let us begin. Did you finish your homework for today?' 
  },
  { 
    id: 'plumber', 
    title: 'بلومبي', 
    subtitle: 'Plumber', 
    icon: <FaTools />, 
    color: '#713f12', 
    screenshot: '/screenshots/plumber.png', 
    systemInstruction: 'You are a plumber. The user called you to fix a leak in their house.', 
    initialMessage: 'Hello! I got your call about a plumbing issue. Where is the leak exactly?' 
  },
  { 
    id: 'coming_soon', 
    title: 'كمل هادو ونزيدوك 😉', 
    subtitle: '... More Coming Soon', 
    icon: <FaLock />, 
    color: '#94a3b8', // لون رمادي كيعطي انطباع باللي راها مسدودة
    screenshot: '/screenshots/coming_soon.png', 
    systemInstruction: 'You are an AI assistant. Tell the user nicely that they need to practice with the other 20 characters first, and new characters will be unlocked soon.', 
    initialMessage: 'برافو عليك! واش ساليتي التدريب مع 20 شخصية لي قبل؟ كمل المهام ديالك، وحنا موجدين ليك شخصيات ومواقف جداد غنحلوهم ليك قريباً! 🚀' 
  }
];
  
  export const BASE_RULES = `
  CRITICAL RULES:
  1. CORRECTIONS IN LATIN DARIJA: Start with "CORRECTION: [Mistake in Darija] | ".
  2. CONCISENESS: Keep English response short.
  3. ALWAYS ASK A QUESTION at the end.
  `;