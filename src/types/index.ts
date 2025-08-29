export type ViewType = 'dashboard' | 'training' | 'progress' | 'library' | 'timer' | 'foundation' | 'advanced' | 'skills' | 'discipline' | 'plan' | 'files' | 'ai' | 'enhanced-library' | 'updates' | 'agent';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  difficulty: DifficultyLevel;
  sets: string;
  reps?: string;
  duration?: string;
  description: string;
  progression: string;
  videoId?: string;
  imageUrl?: string;
  prerequisites?: string[];
  muscleGroups: string[];
  equipment?: string[];
  musclesWorked?: {
    primary: string[];
    secondary: string[];
    stabilizers: string[];
  };
  tendonsInvolved?: string[];
  recoveryTime?: {
    muscle: string;
    tendon: string;
    nervous: string;
  };
  formCues?: string[];
}

export type ExerciseCategory = 
  | 'handstand-inverted'
  | 'pulling-rows' 
  | 'planche-parallettes'
  | 'rings-dynamic'
  | 'dynamic-showstoppers'
  | 'mobility-yoga'
  | 'swimming-cardio';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'elite';

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
