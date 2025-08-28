
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
  Activity
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
    { id: 'swimming-cardio' as ExerciseCategory, name: 'Cardio', icon: Waves, emoji: '🏊' }
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
    <div className="p-4 space-y-4 bg-background">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Exercise Library
        </h1>
        <p className="text-sm text-muted-foreground">
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
        <ScrollArea className="w-full">
          <TabsList className="grid w-max grid-cols-7 mb-4 bg-background-secondary">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="text-xs px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <span className="mr-1">{cat.emoji}</span>
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        {/* Difficulty Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {difficulties.map((diff) => (
            <Button
              key={diff.id}
              variant={selectedDifficulty === diff.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(diff.id as DifficultyLevel | 'all')}
              className={`text-xs whitespace-nowrap ${
                selectedDifficulty === diff.id ? 'bg-primary text-primary-foreground' : 'clean-border'
              }`}
            >
              {diff.name}
            </Button>
          ))}
        </div>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-3">
                {getFilteredExercises().map((exercise) => (
                  <DetailedExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onPlayVideo={setSelectedExercise}
                    onMarkComplete={handleMarkComplete}
                    isCompleted={completedExercises.has(exercise.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CompactExerciseLibrary;
