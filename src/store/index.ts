// src/store/index.ts

import { create } from 'zustand';
import { User, Ranch, Cattle, Task, Production } from '@/types';

interface AppState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Ranch
  currentRanch: Ranch | null;
  ranches: Ranch[];
  setCurrentRanch: (ranch: Ranch) => void;
  setRanches: (ranches: Ranch[]) => void;
  
  // Cattle
  cattle: Cattle[];
  setCattle: (cattle: Cattle[]) => void;
  addCattle: (cattle: Cattle) => void;
  updateCattle: (id: string, cattle: Partial<Cattle>) => void;
  
  // Tasks
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  completeTask: (id: string) => void;
  
  // Productions
  recentProductions: Production[];
  setRecentProductions: (productions: Production[]) => void;
  addProduction: (production: Production) => void;
  
  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Onboarding
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  isOnboardingComplete: boolean;
  setIsOnboardingComplete: (complete: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // User
  user: null,
  setUser: (user) => set({ user }),
  
  // Ranch
  currentRanch: null,
  ranches: [],
  setCurrentRanch: (ranch) => set({ currentRanch: ranch }),
  setRanches: (ranches) => set({ ranches }),
  
  // Cattle
  cattle: [],
  setCattle: (cattle) => set({ cattle }),
  addCattle: (newCattle) => set((state) => ({ 
    cattle: [...state.cattle, newCattle] 
  })),
  updateCattle: (id, updatedCattle) => set((state) => ({
    cattle: state.cattle.map((c) => 
      c.id === id ? { ...c, ...updatedCattle } : c
    ),
  })),
  
  // Tasks
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
  updateTask: (id, updatedTask) => set((state) => ({
    tasks: state.tasks.map((t) => 
      t.id === id ? { ...t, ...updatedTask } : t
    ),
  })),
  completeTask: (id) => set((state) => ({
    tasks: state.tasks.map((t) => 
      t.id === id 
        ? { ...t, status: 'COMPLETED' as const, completedAt: new Date() } 
        : t
    ),
  })),
  
  // Productions
  recentProductions: [],
  setRecentProductions: (productions) => set({ recentProductions: productions }),
  addProduction: (production) => set((state) => ({
    recentProductions: [production, ...state.recentProductions].slice(0, 10),
  })),
  
  // UI State
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  
  // Onboarding
  onboardingStep: 0,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  isOnboardingComplete: false,
  setIsOnboardingComplete: (complete) => set({ isOnboardingComplete: complete }),
}));