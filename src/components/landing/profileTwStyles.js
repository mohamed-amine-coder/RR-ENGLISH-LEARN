const styles = {
  container: "flex min-h-[80vh] items-center justify-center bg-[#f8f9fa] p-4",
  profileCard: "w-full max-w-[500px] rounded-2xl bg-[var(--light-color)] p-8 text-center shadow-lg",
  header: "mb-6 flex flex-col items-center gap-2",
  avatar: "relative",
  editBtn: "absolute bottom-0 right-0 flex h-[30px] w-[30px] items-center justify-center rounded-full border-none bg-[var(--secondary-color)] text-[0.9rem] text-white shadow",
  editInput: "mb-1 w-[80%] rounded-lg border border-[#ccc] p-1 text-center text-2xl",
  name: "m-0 text-3xl text-[var(--dark-color)]",
  roleBadge: "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold shadow-sm",
  subscriptionBox: "mb-5 rounded-xl border border-[#e0e0e0] bg-[#fdfdfd] p-4 text-right",
  subTitle: "mb-3 border-b border-dashed border-[#eee] pb-2 text-base font-bold text-[var(--dark-color)]",
  subGrid: "grid grid-cols-3 gap-2.5",
  subItem: "flex flex-col items-center gap-1",
  subLabel: "text-xs text-[#888]",
  subValue: "text-[0.95rem] font-bold text-[#333]",
  infoSection: "mb-4 flex flex-col gap-2 rounded-md bg-[#f1f3f5] p-4",
  infoRow: "flex items-center justify-center gap-2.5 text-[#555]",
  icon: "",
  editInputSmall: "w-[150px] rounded border border-[#ccc] px-1 py-0.5",
  statsGrid: "grid grid-cols-2 gap-4 max-[480px]:grid-cols-1",
  statBox: "flex flex-col items-center gap-2 rounded-md border border-[#eee] p-4 transition hover:-translate-y-1 hover:shadow-md",
  statIcon: "flex h-[50px] w-[50px] items-center justify-center rounded-full",
  statInfo: "",
  loading: "p-[50px] text-center text-[1.2rem] font-bold",
  error: "p-[50px] text-center text-[1.2rem] font-bold"
};

export default styles;
