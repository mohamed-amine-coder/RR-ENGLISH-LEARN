export const ROLE_OPTIONS = ['free', 'premium', 'admin'];
export const PLAN_OPTIONS = ['none', 'start', 'pro', 'turbo'];

export function toDateInput(value) {
  if (!value) return '';
  const dateObj = value.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(dateObj.getTime())) return '';
  return dateObj.toISOString().split('T')[0];
}

export function normalizeUserDoc(document) {
  const data = document.data();
  return {
    id: document.id,
    ...data,
    role: data.role || 'free',
    gender: data.gender || 'unknown',
    planType: data.planType || 'none',
    subscriptionEndDate: toDateInput(data.subscriptionEndDate),
    phoneNumber: data.phoneNumber || '',
    whatsappGroup: data.whatsappGroup || '',
  };
}

export function getDaysLeft(dateStr) {
  if (!dateStr) return -999;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function computeStats(users) {
  return {
    total: users.length,
    premium: users.filter((u) => u.role === 'premium').length,
    plans: {
      start: users.filter((u) => u.planType === 'start' && u.role === 'premium').length,
      pro: users.filter((u) => u.planType === 'pro' && u.role === 'premium').length,
      turbo: users.filter((u) => u.planType === 'turbo' && u.role === 'premium').length,
    },
  };
}

export function filterUsers(users, searchTerm) {
  if (!searchTerm) return users;
  const term = searchTerm.toLowerCase();
  return users.filter(
    (user) =>
      (user.name && user.name.toLowerCase().includes(term)) ||
      (user.phoneNumber && user.phoneNumber.includes(term)) ||
      (user.whatsappGroup && user.whatsappGroup.toLowerCase().includes(term))
  );
}
