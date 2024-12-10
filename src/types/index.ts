export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  group: string;
  benefits: {
    vacation: number;
    sick: number;
    comp: number;
  };
}

export interface Schedule {
  id: string;
  userId: string;
  date: string;
  shift: string;
  sector?: string;
  isRecurring: boolean;
  recurringPattern?: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
  };
}

export interface TimeOffRequest {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  type: 'vacation' | 'sick' | 'comp';
  status: 'pending' | 'approved' | 'rejected';
  hours: number;
}