export type ViewType = 'dashboard' | 'training' | 'progress' | 'library' | 'timer' | 'foundation' | 'advanced' | 'skills' | 'discipline' | 'plan' | 'files' | 'ai' | 'enhanced-library' | 'updates' | 'agent' | 'tlctv';

export type ExerciseCategory = 'Push' | 'Pull' | 'Core' | 'Legs' | 'Skills' | 'Yoga' | 'Mobility' | 'Flexibility';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface Exercise {
  id: string;
  slug: string;
  name: string;
  category: ExerciseCategory;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string[];
  cues: string[];
  youtubeUrl?: string;
  instagramUrl?: string;
  difficultyLevel: DifficultyLevel;
  chainGroup?: string;
  chainOrder?: number;
  videoVerified?: boolean;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  workoutSuitability: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface WorkoutSession {
  id: string;
  date: Date;
  exercises: string[];
  duration: number;
  completed: boolean;
  achievements?: string[];
}

export interface AppUpdate {
  id: string;
  version: string;
  date: Date;
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'bugfix';
}
