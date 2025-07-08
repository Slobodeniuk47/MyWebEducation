export const ROLES = {
  ADMIN: 'Admin',
  MODERATOR: 'Moderator',
  MANAGER: 'Manager',
  HELPER: 'Helper',
  AMBASSADOR: 'Ambassador',
  VIP2: 'Vip+',
  VIP1: 'Vip',
  STUDENT: 'Student',
  USER: 'User',
} as const;

export const DEFAULT_ROLE = ROLES.USER;