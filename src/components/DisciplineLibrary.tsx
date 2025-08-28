import { useState } from "react";
import { ArrowRight, Target, Clock, Trophy, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
  id: string;
  name: string;
  description: string;
  level: "Foundational" | "Beginner" | "Intermediate" | "Advanced";
  sets?: string;
  reps?: string;
  hold?: string;
  muscleGroups: string[];
  equipment: string;
  completed: boolean;
}

interface Discipline {
  id: string;
  name: string;
  description: string;
  category: "Fundamental Strength" | "Skills" | "Mobility";
  totalExercises: number;
  completedExercises: number;
  exercises: Exercise[];
}

const disciplinesData: Discipline[] = [
  {
    id: "push-up-progression",
    name: "Push-up Progression",
    description: "Build upper body pushing strength",
    category: "Fundamental Strength",
    totalExercises: 8,
    completedExercises: 2,
    exercises: [
      {
        id: "wall-pushups",
        name: "Wall Push-ups",
        description: "Basic pushing pattern against wall",
        level: "Foundational",
        sets: "3",
        reps: "10-15",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        equipment: "Wall",
        completed: true
      },
      {
        id: "incline-pushups",
        name: "Incline Push-ups",
        description: "Elevated hands push-ups",
        level: "Beginner",
        sets: "3",
        reps: "8-12",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        equipment: "Bench/Step",
        completed: true
      },
      {
        id: "knee-pushups",
        name: "Knee Push-ups",
        description: "Modified push-ups on knees",
        level: "Beginner",
        sets: "3",
        reps: "6-10",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        equipment: "None",
        completed: false
      },
      {
        id: "standard-pushups",
        name: "Standard Push-ups",
        description: "Full push-up position",
        level: "Intermediate",
        sets: "3",
        reps: "5-15",
        muscleGroups: ["Chest", "Triceps", "Shoulders", "Core"],
        equipment: "None",
        completed: false
      },
      {
        id: "diamond-pushups",
        name: "Diamond Push-ups",
        description: "Narrow hand position push-ups",
        level: "Intermediate",
        sets: "3",
        reps: "3-8",
        muscleGroups: ["Triceps", "Chest", "Shoulders"],
        equipment: "None",
        completed: false
      },
      {
        id: "decline-pushups",
        name: "Decline Push-ups",
        description: "Feet elevated push-ups",
        level: "Advanced",
        sets: "3",
        reps: "5-12",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        equipment: "Bench/Step",
        completed: false
      },
      {
        id: "one-arm-pushups",
        name: "One Arm Push-ups",
        description: "Single arm push-up",
        level: "Advanced",
        sets: "3",
        reps: "1-5",
        muscleGroups: ["Chest", "Triceps", "Shoulders", "Core"],
        equipment: "None",
        completed: false
      },
      {
        id: "handstand-pushups",
        name: "Handstand Push-ups",
        description: "Inverted push-ups",
        level: "Advanced",
        sets: "3",
        reps: "1-10",
        muscleGroups: ["Shoulders", "Triceps", "Core"],
        equipment: "Wall",
        completed: false
      }
    ]
  },
  {
    id: "pull-up-progression",
    name: "Pull-up Progression",
    description: "Build upper body pulling strength",
    category: "Fundamental Strength",
    totalExercises: 7,
    completedExercises: 1,
    exercises: [
      {
        id: "dead-hang",
        name: "Dead Hang",
        description: "Basic hanging strength",
        level: "Foundational",
        hold: "20-60s",
        sets: "3",
        muscleGroups: ["Forearms", "Lats", "Shoulders"],
        equipment: "Pull-up Bar",
        completed: true
      },
      {
        id: "assisted-pullups",
        name: "Assisted Pull-ups",
        description: "Band or partner assisted",
        level: "Beginner",
        sets: "3",
        reps: "3-8",
        muscleGroups: ["Lats", "Biceps", "Shoulders"],
        equipment: "Resistance Band",
        completed: false
      },
      {
        id: "negative-pullups",
        name: "Negative Pull-ups",
        description: "Controlled descent only",
        level: "Beginner",
        sets: "3",
        reps: "3-5",
        muscleGroups: ["Lats", "Biceps", "Shoulders"],
        equipment: "Pull-up Bar",
        completed: false
      },
      {
        id: "standard-pullups",
        name: "Standard Pull-ups",
        description: "Full pull-up movement",
        level: "Intermediate",
        sets: "3",
        reps: "1-10",
        muscleGroups: ["Lats", "Biceps", "Shoulders"],
        equipment: "Pull-up Bar",
        completed: false
      },
      {
        id: "wide-grip-pullups",
        name: "Wide Grip Pull-ups",
        description: "Wider hand position",
        level: "Intermediate",
        sets: "3",
        reps: "3-8",
        muscleGroups: ["Lats", "Biceps", "Shoulders"],
        equipment: "Pull-up Bar",
        completed: false
      },
      {
        id: "weighted-pullups",
        name: "Weighted Pull-ups",
        description: "Added weight pull-ups",
        level: "Advanced",
        sets: "3",
        reps: "3-8",
        muscleGroups: ["Lats", "Biceps", "Shoulders"],
        equipment: "Weight/Vest",
        completed: false
      },
      {
        id: "one-arm-pullups",
        name: "One Arm Pull-ups",
        description: "Single arm pull-up",
        level: "Advanced",
        sets: "3",
        reps: "1-3",
        muscleGroups: ["Lats", "Biceps", "Shoulders", "Core"],
        equipment: "Pull-up Bar",
        completed: false
      }
    ]
  },
  {
    id: "handstand-progression",
    name: "Handstand Progression",
    description: "Master the handstand skill",
    category: "Skills",
    totalExercises: 6,
    completedExercises: 3,
    exercises: [
      {
        id: "wall-handstand-hold",
        name: "Wall Handstand Hold",
        description: "Build basic handstand strength and balance against a wall",
        level: "Beginner",
        hold: "20-30s",
        sets: "3",
        muscleGroups: ["Shoulders", "Core", "Wrists"],
        equipment: "Wall",
        completed: true
      },
      {
        id: "handstand-kick-ups",
        name: "Handstand Kick-Ups",
        description: "Practice the kicking motion to get into handstand",
        level: "Beginner",
        reps: "8-10",
        sets: "3",
        muscleGroups: ["Shoulders", "Core"],
        equipment: "Wall",
        completed: true
      },
      {
        id: "chest-to-wall",
        name: "Chest-to-Wall Handstand",
        description: "Face wall handstand for better alignment",
        level: "Intermediate",
        hold: "15-45s",
        sets: "3",
        muscleGroups: ["Shoulders", "Core", "Wrists"],
        equipment: "Wall",
        completed: true
      },
      {
        id: "hollow-body-rocks",
        name: "Hollow Body Rocks",
        description: "Core strength for handstand line",
        level: "Beginner",
        reps: "10-20",
        sets: "3",
        muscleGroups: ["Core"],
        equipment: "None",
        completed: false
      },
      {
        id: "freestanding-attempts",
        name: "Freestanding Attempts",
        description: "Practice handstand without wall support",
        level: "Advanced",
        hold: "5-30s",
        sets: "5",
        muscleGroups: ["Shoulders", "Core", "Wrists"],
        equipment: "None",
        completed: false
      },
      {
        id: "handstand-walking",
        name: "Handstand Walking",
        description: "Walk on hands maintaining balance",
        level: "Advanced",
        reps: "5-20 steps",
        sets: "3",
        muscleGroups: ["Shoulders", "Core", "Wrists"],
        equipment: "None",
        completed: false
      }
    ]
  }
];

const DisciplineLibrary = () => {
  const [browseBy, setBrowseBy] = useState<"discipline" | "level">("discipline");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStartProgression = (disciplineName: string) => {
    toast({
      title: "Progression Started",
      description: `Starting ${disciplineName} progression`,
    });
  };

  const handlePracticeExercise = (exerciseName: string) => {
    toast({
      title: "Exercise Started",
      description: `Practicing ${exerciseName}`,
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Foundational": return "bg-gray-600";
      case "Beginner": return "bg-green-600";
      case "Intermediate": return "bg-blue-600";
      case "Advanced": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getProgressPercentage = (discipline: Discipline) => {
    return (discipline.completedExercises / discipline.totalExercises) * 100;
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Discipline Library</h1>
        <p className="text-muted-foreground">Explore skill progressions and foundational movements</p>
      </div>

      <Card className="border-border">
        <CardContent className="p-4">
          <h3 className="font-medium mb-3">Browse By</h3>
          <div className="flex gap-2">
            <Button
              variant={browseBy === "discipline" ? "default" : "secondary"}
              onClick={() => setBrowseBy("discipline")}
              className={browseBy === "discipline" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              Discipline
            </Button>
            <Button
              variant={browseBy === "level" ? "default" : "secondary"}
              onClick={() => setBrowseBy("level")}
              className={browseBy === "level" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              Skill Level
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground mb-4">
        Disciplines &gt; Fundamental Strength
      </div>

      <div className="space-y-3">
        {disciplinesData.map((discipline) => (
          <Card key={discipline.id} className="border-border overflow-hidden">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full h-auto p-4 justify-between hover:bg-card-secondary"
                onClick={() => setSelectedDiscipline(
                  selectedDiscipline === discipline.id ? null : discipline.id
                )}
              >
                <div className="text-left">
                  <h3 className="font-semibold text-lg text-foreground">{discipline.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{discipline.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Trophy className="h-3 w-3" />
                      {discipline.completedExercises}/{discipline.totalExercises} Complete
                    </div>
                    <div className="flex-1 max-w-32">
                      <Progress value={getProgressPercentage(discipline)} className="h-1" />
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </Button>

              {selectedDiscipline === discipline.id && (
                <div className="border-t border-border bg-card-secondary/50">
                  <div className="p-4 space-y-4">
                    <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => handleStartProgression(discipline.name)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Workout
                    </Button>

                    <div className="space-y-3">
                      {discipline.exercises.map((exercise) => (
                        <Card key={exercise.id} className={`border ${exercise.completed ? 'border-green-600 bg-green-950/10' : 'border-border'}`}>
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-sm">{exercise.name}</h4>
                                  <Badge className={`${getLevelColor(exercise.level)} text-white text-xs`}>
                                    {exercise.level}
                                  </Badge>
                                  {exercise.completed && (
                                    <Trophy className="h-3 w-3 text-green-400" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">{exercise.description}</p>
                                
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  {exercise.sets && (
                                    <div className="flex items-center gap-1">
                                      <Target className="h-3 w-3" />
                                      {exercise.sets} sets × {exercise.reps || exercise.hold}
                                    </div>
                                  )}
                                  <div>{exercise.muscleGroups.slice(0, 2).join(", ")}</div>
                                </div>
                              </div>
                              
                              <Button
                                size="sm"
                                variant={exercise.completed ? "secondary" : "default"}
                                onClick={() => handlePracticeExercise(exercise.name)}
                                className="ml-3"
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DisciplineLibrary;