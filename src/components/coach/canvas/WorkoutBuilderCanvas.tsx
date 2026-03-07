import React, { useState, useCallback } from 'react';
import { exerciseDatabase } from '@/data/exerciseDatabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, Copy, FolderOpen, Search } from 'lucide-react';
import type { SavedWorkout, WorkoutExercise } from '@/types/coach';

const STORAGE_KEY = 'coach_saved_workouts';

function loadSavedWorkouts(): SavedWorkout[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveWorkouts(workouts: SavedWorkout[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  } catch {
    // ignore
  }
}

const CATEGORIES = Array.from(new Set(exerciseDatabase.map((e) => e.category)));

export const WorkoutBuilderCanvas: React.FC = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [workoutName, setWorkoutName] = useState('My Workout');
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>(loadSavedWorkouts);
  const [showSaved, setShowSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredExercises = exerciseDatabase.filter((ex) => {
    const matchSearch =
      !search ||
      ex.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || ex.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const addExercise = useCallback((ex: (typeof exerciseDatabase)[0]) => {
    setWorkoutExercises((prev) => {
      if (prev.find((w) => w.exerciseId === ex.id)) return prev;
      return [
        ...prev,
        {
          exerciseId: ex.id,
          name: ex.name,
          sets: ex.sets.includes('×') ? ex.sets.split('×')[0].trim() : ex.sets,
          reps: ex.reps ?? ex.sets,
          notes: '',
        },
      ];
    });
  }, []);

  const removeExercise = (id: string) => {
    setWorkoutExercises((prev) => prev.filter((w) => w.exerciseId !== id));
  };

  const updateExercise = (id: string, field: 'sets' | 'reps' | 'notes', value: string) => {
    setWorkoutExercises((prev) =>
      prev.map((w) => (w.exerciseId === id ? { ...w, [field]: value } : w))
    );
  };

  const saveWorkout = () => {
    if (!workoutExercises.length) return;
    const newWorkout: SavedWorkout = {
      id: `workout-${Date.now()}`,
      name: workoutName || 'My Workout',
      exercises: workoutExercises,
      createdAt: Date.now(),
    };
    const updated = [newWorkout, ...savedWorkouts];
    setSavedWorkouts(updated);
    saveWorkouts(updated);
  };

  const loadWorkout = (workout: SavedWorkout) => {
    setWorkoutExercises(workout.exercises);
    setWorkoutName(workout.name);
    setShowSaved(false);
  };

  const copyToClipboard = async () => {
    const text =
      `# ${workoutName}\n\n` +
      workoutExercises
        .map((w, i) => `${i + 1}. ${w.name} — ${w.sets} sets × ${w.reps}${w.notes ? ` (${w.notes})` : ''}`)
        .join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="p-4 h-full flex flex-col gap-3 overflow-auto">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-serif text-2xl font-black text-foreground">Workout Builder</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSaved((v) => !v)}
          className="rounded-[12px] border-[2px] border-foreground text-xs"
        >
          <FolderOpen className="h-3 w-3 mr-1" />
          Load
        </Button>
      </div>

      {/* Saved workouts */}
      {showSaved && savedWorkouts.length > 0 && (
        <div className="p-3 rounded-[16px] border-[2px] border-foreground bg-muted space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Saved Workouts</p>
          {savedWorkouts.map((w) => (
            <button
              key={w.id}
              onClick={() => loadWorkout(w)}
              className="w-full text-left p-2 rounded-[10px] border border-foreground bg-card hover:bg-primary/5 text-xs"
            >
              <span className="font-semibold">{w.name}</span>
              <span className="text-muted-foreground ml-2">({w.exercises.length} exercises)</span>
            </button>
          ))}
        </div>
      )}

      {/* Two-column: picker + workout */}
      <div className="flex gap-3 flex-1 min-h-0 overflow-hidden">
        {/* Exercise picker */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exercises..."
              className="pl-8 h-8 text-xs rounded-[12px] border-[2px] border-foreground"
            />
          </div>

          {/* Category filter */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`text-[10px] font-bold px-2 py-1 rounded-[8px] border whitespace-nowrap shrink-0 ${
                categoryFilter === 'all'
                  ? 'border-foreground bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-[10px] font-bold px-2 py-1 rounded-[8px] border whitespace-nowrap shrink-0 ${
                  categoryFilter === cat
                    ? 'border-foreground bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground'
                }`}
              >
                {cat.split('-')[0]}
              </button>
            ))}
          </div>

          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-1.5 pr-1">
              {filteredExercises.map((ex) => {
                const added = workoutExercises.some((w) => w.exerciseId === ex.id);
                return (
                  <div
                    key={ex.id}
                    className={`p-2.5 rounded-[12px] border-[2px] flex items-center justify-between gap-2 ${
                      added ? 'border-primary bg-primary/5' : 'border-foreground bg-card'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{ex.name}</p>
                      <p className="text-[10px] text-muted-foreground">{ex.sets}</p>
                    </div>
                    <button
                      onClick={() => addExercise(ex)}
                      disabled={added}
                      className={`shrink-0 w-6 h-6 rounded-full border-[2px] flex items-center justify-center transition-colors ${
                        added
                          ? 'border-primary text-primary cursor-default'
                          : 'border-foreground text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary'
                      }`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Workout list */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <Input
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="Workout name..."
            className="h-8 text-xs font-bold rounded-[12px] border-[2px] border-foreground"
          />

          <div className="text-[10px] text-muted-foreground">
            {workoutExercises.length} exercises · ~{workoutExercises.length * 8}min
          </div>

          <ScrollArea className="flex-1">
            {workoutExercises.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic text-center px-4">
                Add exercises from the left panel
              </div>
            ) : (
              <div className="flex flex-col gap-2 pr-1">
                {workoutExercises.map((w, i) => (
                  <div key={w.exerciseId} className="p-3 rounded-[12px] border-[2px] border-foreground bg-card">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-semibold text-foreground">
                        {i + 1}. {w.name}
                      </p>
                      <button
                        onClick={() => removeExercise(w.exerciseId)}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex gap-1.5">
                      <Input
                        value={w.sets}
                        onChange={(e) => updateExercise(w.exerciseId, 'sets', e.target.value)}
                        placeholder="Sets"
                        className="h-6 text-[11px] rounded-[8px] border border-foreground px-1.5"
                      />
                      <Input
                        value={w.reps}
                        onChange={(e) => updateExercise(w.exerciseId, 'reps', e.target.value)}
                        placeholder="Reps"
                        className="h-6 text-[11px] rounded-[8px] border border-foreground px-1.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={saveWorkout}
              disabled={!workoutExercises.length}
              className="flex-1 h-8 text-xs rounded-[12px] border-[2px] border-foreground"
            >
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button
              variant="outline"
              onClick={copyToClipboard}
              disabled={!workoutExercises.length}
              className="flex-1 h-8 text-xs rounded-[12px] border-[2px] border-foreground"
            >
              <Copy className="h-3 w-3 mr-1" />
              {copied ? 'Copied!' : 'Export'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
