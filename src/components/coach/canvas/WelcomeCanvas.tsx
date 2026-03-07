import React from 'react';
import type { CanvasMode } from '@/types/coach';
import { Dumbbell, ActivitySquare, TrendingUp, GitBranch, ClipboardList, BookOpen } from 'lucide-react';

interface WelcomeCanvasProps {
  onSelectMode: (mode: CanvasMode) => void;
}

const CARDS: {
  mode: CanvasMode;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    mode: 'exercise-detail',
    icon: Dumbbell,
    title: 'Exercise Detail',
    description: 'Deep-dive into any exercise — form cues, muscle breakdown, recovery times.',
    color: 'text-orange-500',
  },
  {
    mode: 'muscle-map',
    icon: ActivitySquare,
    title: 'Muscle Map',
    description: 'Interactive body map — click any muscle to find exercises that target it.',
    color: 'text-red-500',
  },
  {
    mode: 'progress-tracker',
    icon: TrendingUp,
    title: 'Progress Tracker',
    description: 'Training analytics — weekly volume, streaks, category breakdowns.',
    color: 'text-green-500',
  },
  {
    mode: 'skill-tree',
    icon: GitBranch,
    title: 'Skill Tree',
    description: 'Visual progressions from beginner to elite across all calisthenics skills.',
    color: 'text-blue-500',
  },
  {
    mode: 'workout-builder',
    icon: ClipboardList,
    title: 'Workout Builder',
    description: 'Build, save, and export custom workouts from the exercise database.',
    color: 'text-purple-500',
  },
  {
    mode: 'learn-mode',
    icon: BookOpen,
    title: 'Learn Mode',
    description: 'Science-backed motor learning principles to accelerate skill acquisition.',
    color: 'text-yellow-500',
  },
];

export const WelcomeCanvas: React.FC<WelcomeCanvasProps> = ({ onSelectMode }) => {
  return (
    <div className="p-6 h-full overflow-auto">
      {/* Hero */}
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl font-black text-foreground leading-tight mb-2">
          Coach Care Studio
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Your premium AI coaching workspace. Chat with your coach on the left, explore tools on the right.
        </p>
      </div>

      {/* Mode cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {CARDS.map(({ mode, icon: Icon, title, description, color }) => (
          <button
            key={mode}
            onClick={() => onSelectMode(mode)}
            className="text-left p-5 rounded-[24px] border-[3px] border-foreground bg-card hover:bg-primary/5 transition-colors shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
          >
            <div className={`mb-3 ${color}`}>
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="font-bold text-foreground text-base mb-1">{title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
          </button>
        ))}
      </div>

      {/* Tip */}
      <p className="text-center text-[11px] text-muted-foreground mt-8 tracking-wide">
        💡 Chat with your coach to auto-switch canvas modes
      </p>
    </div>
  );
};
