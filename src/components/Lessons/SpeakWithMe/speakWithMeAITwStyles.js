const styles = {
  container: "mx-auto my-[30px] h-[85vh] max-w-[800px] px-4",
  chatWrapper: "flex h-full flex-col overflow-hidden rounded-[20px] border border-[#eaeaea] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
  header: "flex items-center gap-4 bg-[#0077ff] px-6 py-4 text-white",
  headerIcon: "flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white/20",
  headerInfo: "",
  history: "flex flex-1 flex-col gap-5 overflow-y-auto bg-[#f8f9fc] p-6",
  messageWrapper: "flex max-w-[85%] items-end gap-2.5",
  userWrapper: "self-end flex-row-reverse",
  modelWrapper: "self-start",
  avatar: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
  userAvatar: "bg-[#e2e8f0] text-[#64748b]",
  modelAvatar: "bg-[#0077ff] text-white",
  messageContent: "flex max-w-full flex-col gap-1",
  bubble: "rounded-[18px] px-[18px] py-3.5 text-[15px] leading-relaxed",
  userBubble: "rounded-br-[4px] bg-[#0077ff] text-white",
  modelBubble: "rounded-bl-[4px] border border-[#e2e8f0] bg-white text-[#1e293b] shadow-[0_2px_4px_rgba(0,0,0,0.02)]",
  correctionBox: "mb-1 rounded-lg border-l-4 border-l-[#f59e0b] bg-[#fffbeb] px-3.5 py-2.5 text-sm text-[#92400e] shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
  correctionIcon: "inline-flex items-center gap-1 font-semibold text-[#d97706]",
  inputArea: "flex gap-3 border-t border-[#eaeaea] bg-white p-5",
  inputField: "flex-1 rounded-[14px] border-2 border-[#f1f5f9] bg-[#f8fafc] px-5 py-3.5 text-[15px] outline-none transition focus:border-[#0077ff] focus:bg-white",
  sendBtn: "flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#ff7b00] text-white transition hover:scale-105 hover:bg-[#e66a00] disabled:cursor-not-allowed disabled:opacity-50",
  loadingBubble: "flex items-center gap-1 p-[18px]",
  dot: "h-1.5 w-1.5 rounded-full bg-[#94a3b8]"
};

export default styles;
