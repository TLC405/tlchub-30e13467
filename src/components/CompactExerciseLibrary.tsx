
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { exerciseDatabase } from "@/data/exerciseDatabase";
import DetailedExerciseCard from "./DetailedExerciseCard";
import type { ExerciseCategory } from "@/types";
import { Target, TrendingUp, Zap, Heart, Star, Activity, Footprints, StretchHorizontal } from "lucide-react";

const CompactExerciseLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory>('Push');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | 'all'>('all');
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'Push' as ExerciseCategory, name: 'Push', icon: Zap, emoji: '⚡' },
    { id: 'Pull' as ExerciseCategory, name: 'Pull', icon: TrendingUp, emoji: '💪' },
    { id: 'Core' as ExerciseCategory, name: 'Core', icon: Target, emoji: '🎯' },
    { id: 'Legs' as ExerciseCategory, name: 'Legs', icon: Footprints, emoji: '🦵' },
    { id: 'Skills' as ExerciseCategory, name: 'Skills', icon: Star, emoji: '⭐' },
    { id: 'Yoga' as ExerciseCategory, name: 'Yoga', icon: Heart, emoji: '🧘' },
    { id: 'Mobility' as ExerciseCategory, name: 'Mobility', icon: Activity, emoji: '🔄' },
    { id: 'Flexibility' as ExerciseCategory, name: 'Flex', icon: StretchHorizontal, emoji: '🤸' },
  ];

  const difficulties = [
    { id: 'all', name: 'All', level: 0 },
    { id: '1', name: 'L1', level: 1 },
    { id: '2', name: 'L2', level: 2 },
    { id: '3', name: 'L3', level: 3 },
    { id: '4', name: 'L4', level: 4 },
    { id: '5', name: 'L5', level: 5 },
  ];

  const getFilteredExercises = () => {
    let exercises = exerciseDatabase.filter(ex => ex.category === selectedCategory);
    if (selectedDifficulty !== 'all') {
      exercises = exercises.filter(ex => ex.difficultyLevel === selectedDifficulty);
    }
    return exercises;
  };

  const getCategoryCount = (categoryId: ExerciseCategory) =>
    exerciseDatabase.filter(ex => ex.category === categoryId).length;

  const handleMarkComplete = (exerciseId: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
    } else {
      newCompleted.add(exerciseId);
    }
    setCompletedExercises(newCompleted);
  };

  return (
    <div className="space-y-6 max-w-full">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Exercise Library</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">99 real exercises with YouTube demos — no mock data</p>
      </div>

      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as ExerciseCategory)}>
        <div className="w-full overflow-x-auto">
          <TabsList className="grid w-max grid-cols-8 mb-6 bg-card border">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="text-xs px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <div className="flex flex-col items-center space-y-1">
                  <span>{cat.emoji}</span>
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-xs opacity-70">{getCategoryCount(cat.id)}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {difficulties.map((diff) => (
            <Button
              key={diff.id}
              variant={String(selectedDifficulty) === diff.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(diff.id === 'all' ? 'all' : Number(diff.id))}
              className={`text-xs whitespace-nowrap ${String(selectedDifficulty) === diff.id ? 'bg-primary text-primary-foreground' : ''}`}
            >
              {diff.name}
            </Button>
          ))}
        </div>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <ScrollArea className="h-[70vh]">
              <div className="space-y-4 pr-4">
                {getFilteredExercises().length > 0 ? (
                  getFilteredExercises().map((exercise) => (
                    <DetailedExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onMarkComplete={handleMarkComplete}
                      isCompleted={completedExercises.has(exercise.id)}
                    />
                  ))
                ) : (
                  <Card className="p-8 text-center">
                    <div className="text-muted-foreground">
                      <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">No exercises found</p>
                      <p className="text-sm">Try a different difficulty level.</p>
                    </div>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CompactExerciseLibrary;
