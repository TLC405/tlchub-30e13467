import * as React from 'react';
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { LearnModeIntensity, LearningPrinciple, LearnConfig } from '@/types/learning';
import { principlesMap, applyTemplate } from '@/data/learningPrinciples';

const LEARN_MODE_KEY = 'learn_mode_intensity';
const LEARN_ROTATION_PREFIX = 'learn_rotation_';

interface LearnModeContextType {
  intensity: LearnModeIntensity;
  setIntensity: (intensity: LearnModeIntensity) => void;
  getPrincipleForExercise: (slug: string) => LearningPrinciple | undefined;
  getAppliedContent: (principle: LearningPrinciple, exerciseName: string, applyNote?: string) => string;
  getNextRotationPrinciple: (exerciseId: string, slugs: string[]) => LearningPrinciple | undefined;
}

const LearnModeContext = createContext<LearnModeContextType | undefined>(undefined);

const getStoredIntensity = (): LearnModeIntensity => {
  try {
    const stored = localStorage.getItem(LEARN_MODE_KEY);
    if (stored === 'low' || stored === 'standard' || stored === 'nerdy') {
      return stored;
    }
  } catch {
    // Ignore localStorage errors
  }
  return 'standard';
};

export const LearnModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [intensity, setIntensityState] = useState<LearnModeIntensity>(getStoredIntensity);

  const setIntensity = useCallback((newIntensity: LearnModeIntensity) => {
    setIntensityState(newIntensity);
    try {
      localStorage.setItem(LEARN_MODE_KEY, newIntensity);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const getPrincipleForExercise = useCallback((slug: string): LearningPrinciple | undefined => {
    return principlesMap[slug];
  }, []);

  const getAppliedContent = useCallback(
    (principle: LearningPrinciple, exerciseName: string, applyNote?: string): string => {
      if (applyNote) {
        return applyNote;
      }
      return applyTemplate(principle.how_to_apply_template, exerciseName);
    },
    []
  );

  const getNextRotationPrinciple = useCallback(
    (exerciseId: string, slugs: string[]): LearningPrinciple | undefined => {
      if (!slugs.length) return undefined;

      const key = `${LEARN_ROTATION_PREFIX}${exerciseId}`;
      let lastIndex = 0;
      
      try {
        lastIndex = parseInt(localStorage.getItem(key) || '0', 10);
      } catch {
        // Ignore localStorage errors
      }

      const nextIndex = (lastIndex + 1) % slugs.length;
      
      try {
        localStorage.setItem(key, nextIndex.toString());
      } catch {
        // Ignore localStorage errors
      }

      return principlesMap[slugs[nextIndex]];
    },
    []
  );

  const value = useMemo(
    () => ({
      intensity,
      setIntensity,
      getPrincipleForExercise,
      getAppliedContent,
      getNextRotationPrinciple,
    }),
    [intensity, setIntensity, getPrincipleForExercise, getAppliedContent, getNextRotationPrinciple]
  );

  return (
    <LearnModeContext.Provider value={value}>
      {children}
    </LearnModeContext.Provider>
  );
};

export const useLearnMode = (): LearnModeContextType => {
  const context = useContext(LearnModeContext);
  if (!context) {
    throw new Error('useLearnMode must be used within a LearnModeProvider');
  }
  return context;
};
