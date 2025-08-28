
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { exerciseDatabase } from "@/data/exerciseDatabase";
import VideoPlayer from "./VideoPlayer";
import type { ExerciseCategory, DifficultyLevel } from "@/types";
import { 
  Play, 
  Target, 
  Zap, 
  TrendingUp,
  Heart,
  Waves,
  Search
} from "lucide-react";

const CompactExerciseLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory>('handstand-inverted');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const categories = [
    { id: 'handstand-inverted' as ExerciseCategory, name: 'Handstand', icon: Target, emoji: '🎯' },
    { id: 'pulling-rows' as ExerciseCategory, name: 'Pulling', icon: TrendingUp, emoji: '💪' },
    { id: 'planche-parallettes' as ExerciseCategory, name: 'Planche', icon: Zap, emoji: '⚡' },
    { id: 'rings-dynamic' as ExerciseCategory, name: 'Rings', icon: Target, emoji: '🔴' },
    { id: 'dynamic-showstoppers' as ExerciseCategory, name: 'Elite Skills', icon: Zap, emoji: '🌟' },
    { id: 'mobility-yoga' as ExerciseCategory, name: 'Mobility', icon: Heart, emoji: '🧘' },
    { id: 'swimming-cardio' as ExerciseCategory, name: 'Cardio', icon: Waves, emoji: '🏊' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels', color: 'bg-gray-500' },
    { id: 'beginner', name: 'Beginner', color: 'bg-green-500' },
    { id: 'intermediate', name: 'Intermediate', color: 'bg-yellow-500' },
    { id: 'advanced', name: 'Advanced', color: 'bg-orange-500' },
    { id: 'elite', name: 'Elite', color: 'bg-red-500' }
  ];

  const getFilteredExercises = () => {
    let exercises = exerciseDatabase.filter(ex => ex.category === selectedCategory);
    
    if (selectedDifficulty !== 'all') {
      exercises = exercises.filter(ex => ex.difficulty === selectedDifficulty);
    }
    
    return exercises;
  };

  const getDifficultyColor = (difficulty: string) => {
    const diff = difficulties.find(d => d.id === difficulty);
    return diff?.color || 'bg-gray-500';
  };

  return (
    <div className="p-3 space-y-3 mobile-safe-area">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="tactical-font text-xl font-black text-primary tracking-wider">
          EXERCISE LIBRARY
        </h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Elite Calisthenics Database
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
          <TabsList className="grid w-max grid-cols-7 mb-3">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="text-xs px-2">
                <span className="mr-1">{cat.emoji}</span>
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        {/* Difficulty Filter */}
        <div className="flex gap-1 mb-3 overflow-x-auto">
          {difficulties.map((diff) => (
            <Button
              key={diff.id}
              variant={selectedDifficulty === diff.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(diff.id as DifficultyLevel | 'all')}
              className="text-xs whitespace-nowrap"
            >
              {diff.name}
            </Button>
          ))}
        </div>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {getFilteredExercises().map((exercise) => (
                  <Card key={exercise.id} className="bg-card border border-primary">
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className="text-lg">{category.emoji}</div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm tactical-font">{exercise.name}</h3>
                            <Badge className={`text-xs text-white ${getDifficultyColor(exercise.difficulty)}`}>
                              {exercise.difficulty.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <p className="text-xs text-muted-foreground">{exercise.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                              <span className="font-medium">{exercise.sets}</span>
                              {exercise.duration && <span> • {exercise.duration}</span>}
                            </div>
                            
                            {exercise.videoId && (
                              <Button
                                size="sm"
                                onClick={() => setSelectedExercise(exercise.videoId!)}
                                className="h-6 px-2 bg-red-500 hover:bg-red-600 text-white text-xs"
                              >
                                <Play className="h-3 w-3 mr-1" />
                                Tutorial
                              </Button>
                            )}
                          </div>
                          
                          {exercise.progression && (
                            <p className="text-xs text-accent">
                              Next: {exercise.progression}
                            </p>
                          )}
                          
                          {exercise.prerequisites && exercise.prerequisites.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {exercise.prerequisites.map((prereq, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {prereq}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
