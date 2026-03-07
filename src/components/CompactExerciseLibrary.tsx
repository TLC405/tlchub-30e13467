
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { exerciseDatabase } from "@/data/exerciseDatabase";
import VideoPlayer from "./VideoPlayer";
import DetailedExerciseCard from "./DetailedExerciseCard";
import type { ExerciseCategory, DifficultyLevel } from "@/types";
import { 
  Target, 
  TrendingUp,
  Zap,
  Heart,
  Waves,
  Star,
  Activity,
  Flame,
  Leaf,
} from "lucide-react";

const CompactExerciseLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory>('handstand-inverted');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'handstand-inverted' as ExerciseCategory, name: 'Handstand', icon: Target, emoji: '🤸' },
    { id: 'pulling-rows' as ExerciseCategory, name: 'Pulling', icon: TrendingUp, emoji: '💪' },
    { id: 'planche-parallettes' as ExerciseCategory, name: 'Planche', icon: Zap, emoji: '⚡' },
    { id: 'rings-dynamic' as ExerciseCategory, name: 'Rings', icon: Target, emoji: '💍' },
    { id: 'dynamic-showstoppers' as ExerciseCategory, name: 'Elite', icon: Star, emoji: '⭐' },
    { id: 'mobility-yoga' as ExerciseCategory, name: 'Mobility', icon: Heart, emoji: '🧘' },
    { id: 'swimming-cardio' as ExerciseCategory, name: 'Cardio', icon: Waves, emoji: '🏊' },
    { id: 'yoga-flow' as ExerciseCategory, name: 'Yoga', icon: Heart, emoji: '🧘' },
    { id: 'mobility-corrective' as ExerciseCategory, name: 'Corrective', icon: Activity, emoji: '🔧' },
    { id: 'endurance-conditioning' as ExerciseCategory, name: 'Endurance', icon: Flame, emoji: '🔥' },
    { id: 'longevity-recovery' as ExerciseCategory, name: 'Longevity', icon: Leaf, emoji: '🌿' },
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels', color: 'bg-muted' },
    { id: 'beginner', name: 'Beginner', color: 'success-gradient' },
    { id: 'intermediate', name: 'Intermediate', color: 'info-gradient' },
    { id: 'advanced', name: 'Advanced', color: 'warning-gradient' },
    { id: 'elite', name: 'Elite', color: 'bg-destructive' }
  ];

  const getFilteredExercises = () => {
    let exercises = exerciseDatabase.filter(ex => ex.category === selectedCategory);
    
    if (selectedDifficulty !== 'all') {
      exercises = exercises.filter(ex => ex.difficulty === selectedDifficulty);
    }
    
    return exercises;
  };

  const getCategoryStats = (categoryId: ExerciseCategory) => {
    const categoryExercises = exerciseDatabase.filter(ex => ex.category === categoryId);
    const byDifficulty = {
      beginner: categoryExercises.filter(ex => ex.difficulty === 'beginner').length,
      intermediate: categoryExercises.filter(ex => ex.difficulty === 'intermediate').length,
      advanced: categoryExercises.filter(ex => ex.difficulty === 'advanced').length,
      elite: categoryExercises.filter(ex => ex.difficulty === 'elite').length
    };
    return byDifficulty;
  };

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
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Exercise Library
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete calisthenics database with detailed anatomy and recovery information
        </p>
      </div>

      {/* Video Player Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <VideoPlayer
              videoId={selectedExercise}
              title="Exercise Tutorial"
              onClose={() => setSelectedExercise(null)}
              autoplay={true}
            />
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ExerciseCategory)}>
        <div className="w-full overflow-x-auto">
          <TabsList className="grid w-max grid-cols-7 mb-6 bg-card border">
            {categories.map((cat) => {
              const stats = getCategoryStats(cat.id);
              const total = Object.values(stats).reduce((a, b) => a + b, 0);
              return (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id} 
                  className="text-xs px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span>{cat.emoji}</span>
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-xs opacity-70">{total} exercises</span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {difficulties.map((diff) => {
            const currentCategoryStats = getCategoryStats(selectedCategory);
            const count = diff.id === 'all' 
              ? Object.values(currentCategoryStats).reduce((a, b) => a + b, 0)
              : currentCategoryStats[diff.id as keyof typeof currentCategoryStats] || 0;
            
            return (
              <Button
                key={diff.id}
                variant={selectedDifficulty === diff.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(diff.id as DifficultyLevel | 'all')}
                className={`text-xs whitespace-nowrap ${
                  selectedDifficulty === diff.id ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                {diff.name} ({count})
              </Button>
            );
          })}
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
                      onPlayVideo={setSelectedExercise}
                      onMarkComplete={handleMarkComplete}
                      isCompleted={completedExercises.has(exercise.id)}
                    />
                  ))
                ) : (
                  <Card className="p-8 text-center">
                    <div className="text-muted-foreground">
                      <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">No exercises found</p>
                      <p className="text-sm">
                        Try selecting a different difficulty level or check back later for new exercises.
                      </p>
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
