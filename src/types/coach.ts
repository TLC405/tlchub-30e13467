export type CanvasMode =
  | 'welcome'
  | 'exercise-detail'
  | 'muscle-map'
  | 'progress-tracker'
  | 'skill-tree'
  | 'workout-builder'
  | 'learn-mode';

export interface ChatMessage {
  id: string;
  role: 'user' | 'coach';
  content: string;
  timestamp: number;
  canvasAction?: CanvasAction;
}

export interface CanvasAction {
  mode: CanvasMode;
  exerciseId?: string;
  skillTreeId?: string;
  muscleGroup?: string;
}

export interface CoachContext {
  activeCanvasMode: CanvasMode;
  selectedExerciseId?: string;
  selectedSkillTreeId?: string;
  recentExercises: string[];
}

export interface CoachResponse {
  text: string;
  canvasAction?: CanvasAction;
}

export interface SavedWorkout {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
  createdAt: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  name: string;
  sets: string;
  reps: string;
  notes: string;
}
