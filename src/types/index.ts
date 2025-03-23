
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  examType: string;
  duration: number; // in minutes
  totalQuestions: number;
  maxMarks: number;
  negativeMarking: number;
  isPremium: boolean;
  sections: ExamSection[];
}

export interface ExamSection {
  id: string;
  name: string;
  questionCount: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  sectionId: string;
  marks: number;
}

export interface Answer {
  questionId: string;
  selectedOption: number | null;
  isMarkedForReview: boolean;
}

export interface TestResult {
  id: string;
  examId: string;
  userId: string;
  score: number;
  maxScore: number;
  timeTaken: number; // in seconds
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  answers: Answer[];
  completedAt: string;
}

export interface PerformanceData {
  label: string;
  value: number;
}

export interface SectionPerformance {
  sectionName: string;
  score: number;
  maxScore: number;
  percentage: number;
}
