
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
  currentProject: number | null;
  completedProjects: number[];
  exerciseResults: Record<number, boolean>;
  examResults: Record<number, number>;
  userName: string | null;
  setCurrentProject: (id: number | null) => void;
  markProjectComplete: (id: number) => void;
  saveExerciseResult: (exerciseId: number, correct: boolean) => void;
  saveExamResult: (projectId: number, score: number) => void;
  login: (name: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentProject: null,
      completedProjects: [],
      exerciseResults: {},
      examResults: {},
      userName: null,
      setCurrentProject: (id) => set({ currentProject: id }),
      markProjectComplete: (id) => set((state) => ({
        completedProjects: state.completedProjects.includes(id)
          ? state.completedProjects
          : [...state.completedProjects, id]
      })),
      saveExerciseResult: (exerciseId, correct) => set((state) => ({
        exerciseResults: { ...state.exerciseResults, [exerciseId]: correct }
      })),
      saveExamResult: (projectId, score) => set((state) => ({
        examResults: { ...state.examResults, [projectId]: score }
      })),
      login: (name) => set({ userName: name }),
      logout: () => set({ userName: null }),
    }),
    {
      name: 'business-analytics-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
