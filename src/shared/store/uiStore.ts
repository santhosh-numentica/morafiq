import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  language: string;
  onboardingCompleted: boolean;
  setLanguage: (language: string) => void;
  setOnboardingCompleted: (completed: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    set => ({
      language: 'en',
      onboardingCompleted: false,
      setLanguage: (language: string) => set({ language }),
      setOnboardingCompleted: (completed: boolean) => set({ onboardingCompleted: completed }),
    }),
    {
      name: 'ui-storage',
    },
  ),
);

export default useUIStore;
