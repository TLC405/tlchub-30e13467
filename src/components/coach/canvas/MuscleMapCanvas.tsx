import React, { useState } from 'react';
import { exerciseDatabase } from '@/data/exerciseDatabase';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface MuscleMapCanvasProps {
  selectedMuscleGroup?: string;
  onSelectMuscle: (group: string | undefined) => void;
}

const FRONT_MUSCLES = [
  { id: 'chest', label: 'Chest', keywords: ['Pectoralis', 'Chest', 'Pecs'], cx: 100, cy: 130, rx: 28, ry: 18 },
  { id: 'shoulders', label: 'Shoulders', keywords: ['Deltoid', 'Shoulder'], cx: 60, cy: 115, rx: 16, ry: 12 },
  { id: 'shoulders-r', label: 'Shoulders', keywords: ['Deltoid', 'Shoulder'], cx: 140, cy: 115, rx: 16, ry: 12 },
  { id: 'biceps', label: 'Biceps', keywords: ['Biceps'], cx: 48, cy: 155, rx: 10, ry: 18 },
  { id: 'biceps-r', label: 'Biceps', keywords: ['Biceps'], cx: 152, cy: 155, rx: 10, ry: 18 },
  { id: 'abs', label: 'Abs', keywords: ['Rectus Abdominis', 'Abs', 'Core', 'Oblique'], cx: 100, cy: 175, rx: 18, ry: 28 },
  { id: 'hip-flexors', label: 'Hip Flexors', keywords: ['Hip Flexor', 'Iliopsoas'], cx: 100, cy: 220, rx: 18, ry: 14 },
  { id: 'quads', label: 'Quads', keywords: ['Quadriceps', 'Quads', 'Vastus', 'Rectus Femoris'], cx: 85, cy: 270, rx: 16, ry: 28 },
  { id: 'quads-r', label: 'Quads', keywords: ['Quadriceps', 'Quads', 'Vastus', 'Rectus Femoris'], cx: 115, cy: 270, rx: 16, ry: 28 },
];

const BACK_MUSCLES = [
  { id: 'traps', label: 'Traps', keywords: ['Trapezius', 'Traps'], cx: 100, cy: 105, rx: 28, ry: 16 },
  { id: 'lats', label: 'Lats', keywords: ['Latissimus', 'Lats'], cx: 85, cy: 155, rx: 18, ry: 28 },
  { id: 'lats-r', label: 'Lats', keywords: ['Latissimus', 'Lats'], cx: 115, cy: 155, rx: 18, ry: 28 },
  { id: 'rhomboids', label: 'Rhomboids', keywords: ['Rhomboid'], cx: 100, cy: 135, rx: 14, ry: 12 },
  { id: 'triceps', label: 'Triceps', keywords: ['Triceps'], cx: 48, cy: 155, rx: 10, ry: 18 },
  { id: 'triceps-r', label: 'Triceps', keywords: ['Triceps'], cx: 152, cy: 155, rx: 10, ry: 18 },
  { id: 'glutes', label: 'Glutes', keywords: ['Glute', 'Gluteus'], cx: 100, cy: 215, rx: 24, ry: 18 },
  { id: 'hamstrings', label: 'Hamstrings', keywords: ['Hamstring', 'Biceps Femoris'], cx: 85, cy: 265, rx: 15, ry: 26 },
  { id: 'hamstrings-r', label: 'Hamstrings', keywords: ['Hamstring', 'Biceps Femoris'], cx: 115, cy: 265, rx: 15, ry: 26 },
  { id: 'calves', label: 'Calves', keywords: ['Calves', 'Gastrocnemius', 'Soleus'], cx: 95, cy: 320, rx: 10, ry: 18 },
  { id: 'calves-r', label: 'Calves', keywords: ['Calves', 'Gastrocnemius', 'Soleus'], cx: 105, cy: 320, rx: 10, ry: 18 },
];

function getMuscleLabel(muscles: typeof FRONT_MUSCLES, id: string): string {
  return muscles.find((m) => m.id === id)?.label ?? id;
}

function getExercisesForMuscle(keywords: string[]): typeof exerciseDatabase {
  return exerciseDatabase.filter((ex) => {
    const allMuscles = [
      ...(ex.musclesWorked?.primary ?? []),
      ...(ex.musclesWorked?.secondary ?? []),
      ...(ex.musclesWorked?.stabilizers ?? []),
      ...ex.muscleGroups,
    ];
    return keywords.some((kw) =>
      allMuscles.some((m) => m.toLowerCase().includes(kw.toLowerCase()))
    );
  });
}

export const MuscleMapCanvas: React.FC<MuscleMapCanvasProps> = ({
  selectedMuscleGroup,
  onSelectMuscle,
}) => {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [highlightId, setHighlightId] = useState<string | undefined>(selectedMuscleGroup);

  const muscles = view === 'front' ? FRONT_MUSCLES : BACK_MUSCLES;
  const selectedMuscle = muscles.find((m) => m.id === highlightId);
  const matchedExercises = selectedMuscle ? getExercisesForMuscle(selectedMuscle.keywords) : [];

  const handleSelect = (id: string) => {
    const newId = highlightId === id ? undefined : id;
    setHighlightId(newId);
    const label = getMuscleLabel(muscles, id);
    onSelectMuscle(newId ? label : undefined);
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4 overflow-auto">
      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('front')}
          className={`flex-1 py-2 text-sm font-bold rounded-[16px] border-[2px] transition-colors ${
            view === 'front'
              ? 'border-foreground bg-primary text-primary-foreground'
              : 'border-foreground bg-card text-foreground hover:bg-primary/10'
          }`}
        >
          Front View
        </button>
        <button
          onClick={() => setView('back')}
          className={`flex-1 py-2 text-sm font-bold rounded-[16px] border-[2px] transition-colors ${
            view === 'back'
              ? 'border-foreground bg-primary text-primary-foreground'
              : 'border-foreground bg-card text-foreground hover:bg-primary/10'
          }`}
        >
          Back View
        </button>
      </div>

      {/* SVG figure */}
      <div className="flex justify-center">
        <svg viewBox="0 0 200 370" className="w-48 h-auto" role="img" aria-label="Body muscle map">
          {/* Body outline */}
          {view === 'front' ? (
            <>
              {/* Head */}
              <circle cx="100" cy="55" r="22" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Neck */}
              <rect x="92" y="76" width="16" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Torso */}
              <rect x="65" y="90" width="70" height="100" rx="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Arms */}
              <rect x="38" y="90" width="22" height="75" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              <rect x="140" y="90" width="22" height="75" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Hips */}
              <rect x="68" y="190" width="64" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Legs */}
              <rect x="68" y="230" width="28" height="90" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              <rect x="104" y="230" width="28" height="90" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            </>
          ) : (
            <>
              {/* Head */}
              <circle cx="100" cy="55" r="22" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Neck */}
              <rect x="92" y="76" width="16" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Torso */}
              <rect x="65" y="90" width="70" height="100" rx="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Arms */}
              <rect x="38" y="90" width="22" height="75" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              <rect x="140" y="90" width="22" height="75" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Hips */}
              <rect x="68" y="190" width="64" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              {/* Legs */}
              <rect x="68" y="230" width="28" height="90" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
              <rect x="104" y="230" width="28" height="90" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            </>
          )}

          {/* Muscle regions */}
          {muscles.map((muscle) => {
            const isSelected = highlightId === muscle.id;
            return (
              <ellipse
                key={muscle.id}
                cx={muscle.cx}
                cy={muscle.cy}
                rx={muscle.rx}
                ry={muscle.ry}
                fill={isSelected ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.2)'}
                stroke={isSelected ? 'hsl(var(--foreground))' : 'hsl(var(--primary) / 0.5)'}
                strokeWidth={isSelected ? 2 : 1}
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleSelect(muscle.id)}
                role="button"
                aria-label={muscle.label}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {Array.from(new Set(muscles.map((m) => m.label))).map((label) => {
          const muscle = muscles.find((m) => m.label === label);
          const isSelected = muscle && highlightId === muscle.id;
          return (
            <button
              key={label}
              onClick={() => muscle && handleSelect(muscle.id)}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-[10px] border-[2px] transition-colors ${
                isSelected
                  ? 'border-foreground bg-primary text-primary-foreground'
                  : 'border-foreground bg-card text-foreground hover:bg-primary/10'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Exercise list for selected muscle */}
      {selectedMuscle && (
        <div className="mt-2">
          <p className="text-sm font-bold text-foreground mb-2">
            Exercises targeting <span className="text-primary">{selectedMuscle.label}</span>
            <span className="text-muted-foreground font-normal ml-1">({matchedExercises.length})</span>
          </p>
          {matchedExercises.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">No exercises found for this muscle group.</p>
          ) : (
            <ScrollArea className="max-h-48">
              <div className="flex flex-col gap-2 pr-2">
                {matchedExercises.slice(0, 8).map((ex) => (
                  <div
                    key={ex.id}
                    className="p-3 rounded-[12px] border-[2px] border-foreground bg-card flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-sm text-foreground">{ex.name}</p>
                      <p className="text-[11px] text-muted-foreground">{ex.sets}{ex.reps ? ` × ${ex.reps}` : ''}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] border-[2px] border-foreground">
                      {ex.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      )}
    </div>
  );
};
