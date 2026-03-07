import React, { useState } from 'react';
import type { CanvasMode } from '@/types/coach';
import { WelcomeCanvas } from './WelcomeCanvas';
import { ExerciseDetailCanvas } from './ExerciseDetailCanvas';
import { MuscleMapCanvas } from './MuscleMapCanvas';
import { ProgressTrackerCanvas } from './ProgressTrackerCanvas';
import { SkillTreeCanvas } from './SkillTreeCanvas';
import { WorkoutBuilderCanvas } from './WorkoutBuilderCanvas';
import { LearnModeCanvas } from './LearnModeCanvas';
import {
  Home,
  Dumbbell,
  ActivitySquare,
  TrendingUp,
  GitBranch,
  ClipboardList,
  BookOpen,
} from 'lucide-react';

interface CanvasPanelProps {
  activeCanvasMode: CanvasMode;
  setActiveCanvasMode: (mode: CanvasMode) => void;
  selectedExerciseId?: string;
  setSelectedExerciseId: (id: string | undefined) => void;
  selectedSkillTreeId?: string;
  setSelectedSkillTreeId: (id: string | undefined) => void;
  selectedMuscleGroup?: string;
  setSelectedMuscleGroup: (group: string | undefined) => void;
  onAskCoach: (msg: string) => void;
}

const MODE_META: Record<CanvasMode, { label: string; icon: React.ElementType }> = {
  welcome: { label: 'Home', icon: Home },
  'exercise-detail': { label: 'Exercise', icon: Dumbbell },
  'muscle-map': { label: 'Muscles', icon: ActivitySquare },
  'progress-tracker': { label: 'Progress', icon: TrendingUp },
  'skill-tree': { label: 'Skill Tree', icon: GitBranch },
  'workout-builder': { label: 'Workout', icon: ClipboardList },
  'learn-mode': { label: 'Learn', icon: BookOpen },
};

const MODE_ORDER: CanvasMode[] = [
  'welcome',
  'exercise-detail',
  'muscle-map',
  'progress-tracker',
  'skill-tree',
  'workout-builder',
  'learn-mode',
];

export const CanvasPanel: React.FC<CanvasPanelProps> = ({
  activeCanvasMode,
  setActiveCanvasMode,
  selectedExerciseId,
  setSelectedExerciseId,
  selectedSkillTreeId,
  setSelectedSkillTreeId,
  selectedMuscleGroup,
  setSelectedMuscleGroup,
  onAskCoach,
}) => {
  const ActiveIcon = MODE_META[activeCanvasMode].icon;

  const renderCanvas = () => {
    switch (activeCanvasMode) {
      case 'exercise-detail':
        return (
          <ExerciseDetailCanvas
            exerciseId={selectedExerciseId}
            onAskCoach={onAskCoach}
          />
        );
      case 'muscle-map':
        return (
          <MuscleMapCanvas
            selectedMuscleGroup={selectedMuscleGroup}
            onSelectMuscle={setSelectedMuscleGroup}
          />
        );
      case 'progress-tracker':
        return <ProgressTrackerCanvas />;
      case 'skill-tree':
        return (
          <SkillTreeCanvas
            selectedTreeId={selectedSkillTreeId}
            onSelectTree={setSelectedSkillTreeId}
            onAskCoach={onAskCoach}
          />
        );
      case 'workout-builder':
        return <WorkoutBuilderCanvas />;
      case 'learn-mode':
        return <LearnModeCanvas selectedExerciseId={selectedExerciseId} />;
      case 'welcome':
      default:
        return <WelcomeCanvas onSelectMode={setActiveCanvasMode} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Toolbar */}
      <div className="px-3 py-2 border-b-[3px] border-foreground bg-card shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ActiveIcon className="h-4 w-4 text-primary" />
            <span className="font-bold text-sm text-foreground">
              {MODE_META[activeCanvasMode].label}
            </span>
          </div>
        </div>

        {/* Mode switcher */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {MODE_ORDER.map((mode) => {
            const Icon = MODE_META[mode].icon;
            const isActive = mode === activeCanvasMode;
            return (
              <button
                key={mode}
                onClick={() => setActiveCanvasMode(mode)}
                title={MODE_META[mode].label}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-[11px] font-semibold whitespace-nowrap transition-colors border-[2px] ${
                  isActive
                    ? 'border-foreground bg-primary text-primary-foreground'
                    : 'border-transparent bg-muted text-muted-foreground hover:border-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3 w-3 shrink-0" />
                {MODE_META[mode].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Canvas content */}
      <div className="flex-1 overflow-auto transition-opacity duration-200">
        {renderCanvas()}
      </div>
    </div>
  );
};
