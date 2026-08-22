export interface Book {
  id: string;
  title: string;
  grade: string;
  subject: string;
  category: string;
}

export interface Scholarship {
  id: string;
  name: string;
  country?: string;
  gender: 'همه' | 'دخترانه' | 'پسرانه';
  levels: ('مکتب' | 'لیسانس' | 'ماستری' | 'دکترا')[];
  format: 'حضوری' | 'آنلاین';
  coverage: 'کاملاً رایگان' | 'بورسیه درصدی';
  isVerified: boolean;
  targetAudience: string;
  description: string;
  link: string;
}

export interface VolunteerSession {
  id: string;
  subject: string;
  tutor: string;
  platform: string;
  schedule: string;
}
