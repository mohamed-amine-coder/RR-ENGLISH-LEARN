const styles = {
  loading: "fixed inset-0 z-[9999] flex h-screen flex-col items-center justify-center bg-[var(--primary-color)] text-white",
  loadingSpinner: "mb-5 h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white",
  
  navbar: "sticky top-0 z-[1000] flex h-[70px] w-full items-center justify-between bg-[var(--primary-color)] px-4 md:px-8 py-3 shadow-md backdrop-blur-md",
  
  logo: "flex cursor-pointer items-center gap-3 no-underline",
  logoImg: "h-[40px] w-[40px] md:h-[45px] md:w-[45px] rounded-full border-2 border-white/20 object-cover",
  logoText: "flex flex-col leading-none",
  brandName: "text-[1.1rem] md:text-[1.2rem] font-extrabold tracking-wide text-white",
  tagline: "mt-1 text-[0.7rem] font-medium text-white/80",
  
  // حيدنا اللون الكحل لي كان كيخفي الزر فالموبايل
  menuToggle: "z-[2000] hidden p-2 text-white transition hover:text-gray-200 max-md:block",
  
  navOverlay: "invisible fixed inset-0 z-[1400] bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-300",
  show: "visible opacity-100",
  
  // زدنا transition-transform باش القائمة الجانبية تدخل بسلاسة
  navLinks: "flex items-center gap-6 transition-transform duration-300 max-md:fixed max-md:right-0 max-md:top-0 max-md:z-[1500] max-md:h-screen max-md:w-[280px] max-md:translate-x-full max-md:flex-col max-md:items-start max-md:bg-white max-md:px-6 max-md:pb-10 max-md:pt-[80px] max-md:shadow-2xl",
  open: "max-md:translate-x-0",
  
  // كلاس الروابط جبناه لهنا باش الكود يبقى نقي
  navItem: "relative flex items-center gap-2 py-2 text-base font-semibold text-white/90 transition hover:text-white max-md:w-full max-md:justify-start max-md:border-b max-md:border-gray-100 max-md:py-4 max-md:text-[1.1rem] max-md:text-[var(--dark-color)] max-md:hover:text-[var(--primary-color)]",
  
  profileLink: "flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20 max-md:mt-4 max-md:w-full max-md:bg-[#f8f9fa] max-md:text-[var(--dark-color)] max-md:hover:bg-gray-200",
  
  adminWrapper: "w-full max-md:mt-3",
  adminBtn: "flex w-full items-center justify-center gap-2 rounded-full border-none bg-white px-5 py-2.5 text-sm font-bold text-[var(--primary-color)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md max-md:bg-[var(--primary-color)] max-md:text-white"
};

export default styles;