
export interface Exercise {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ExamQuestion {
  id: number;
  question: string;
  type: 'multiple' | 'code';
  options?: string[];
  correctAnswer?: number;
  codePrompt?: string;
  expectedOutput?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  topics: string[];
  knowledge: string[];
  codeExample: string;
  exercises: Exercise[];
  exam: ExamQuestion[];
}
