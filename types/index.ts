export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: 'student' | 'admin';
  provider: 'credentials' | 'google';
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  previewVideo?: string;
  instructor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  isPremium: boolean;
  category: string;
  rating: number;
  students: number;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
}

export interface Lesson {
  _id: string;
  courseId: string;
  title: string;
  description?: string;
  videoUrl: string;
  duration: string;
  order: number;
  resources: Resource[];
  isPremium: boolean;
}

export interface Resource {
  title: string;
  url: string;
  type: 'pdf' | 'video' | 'link';
}

export interface Note {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  fileUrl: string;
  category: string;
  isPremium: boolean;
  downloads: number;
  createdAt: Date;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail?: string;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  views: number;
  createdAt: Date;
}

export interface MembershipPlan {
  _id: string;
  name: 'monthly' | 'yearly' | 'lifetime';
  price: number;
  duration: number; // in days, -1 for lifetime
  features: string[];
}

export interface Membership {
  _id: string;
  userId: string;
  plan: 'monthly' | 'yearly' | 'lifetime';
  status: 'active' | 'expired' | 'pending';
  startDate: Date;
  endDate?: Date;
  paymentId: string;
}

export interface Payment {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  phone: string;
  plan: 'monthly' | 'yearly' | 'lifetime';
  amount: number;
  transactionId: string;
  screenshot?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: Date;
}

export interface Quiz {
  _id: string;
  courseId: string;
  title: string;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  _id: string;
  type: 'mcq' | 'fill-blank' | 'translation';
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
}

export interface QuizResult {
  _id: string;
  userId: string;
  quizId: string;
  score: number;
  total: number;
  passed: boolean;
  createdAt: Date;
}

export interface Certificate {
  _id: string;
  userId: string;
  courseId: string;
  issuedAt: Date;
  certificateUrl: string;
}

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Progress {
  _id: string;
  userId: string;
  courseId: string;
  completedLessons: string[];
  lastWatched: string;
  percentage: number;
}
