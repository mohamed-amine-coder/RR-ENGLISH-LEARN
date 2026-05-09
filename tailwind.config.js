/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0077ff',      /* اللون الرئيسي (الزرق) */
        secondary: '#ff7b00',    /* اللون الثانوي (الليموني) */
        success: '#58cc02',      /* الأخضر ديال الجواب الصحيح */
        successDark: '#58a700',  /* الأخضر الغامق ديال الـ Border */
        error: '#ff4b4b',        /* الأحمر ديال الخطأ */
        errorDark: '#ea2b2b',    /* الأحمر الغامق ديال الـ Border */
        errorLight: '#ffdfe0',   /* خلفية الخطأ */
        dark: '#3c3c3c',         /* لون النصوص الكحلة */
        lightBg: '#f7f7f7',      /* الخلفيات الرمادية الفاتحة */
        background: '#f5f5f5',   /* لون خلفية الموقع */
      },
      fontFamily: {
        main: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}