import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Zap, 
  Dumbbell, 
  ArrowUp, 
  CircleDot, 
  Clock, 
  Target, 
  Trophy,
  PlayCircle,
  CheckCircle
} from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  target: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  muscleGroups: string[];
  equipment: string[];
  reps?: string;
  sets?: number;
  holdTime?: string;
  completed?: boolean;
}

interface ExerciseCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: "handstand" | "planche" | "pullup" | "rings";
  exercises: Exercise[];
}

const exerciseData: ExerciseCategory[] = [
  {
    id: "handstand",
    title: "Handstand",
    icon: <Zap className="h-5 w-5" />,
    color: "handstand",
    exercises: [
      {
        id: "wall-handstand",
        name: "Wall Handstand Hold",
        target: "3×20–30s",
        level: "Beginner",
        description: "Build basic handstand strength and balance against a wall",
        muscleGroups: ["Shoulders", "Core", "Wrists"],
        equipment: ["Wall"],
        sets: 3,
        holdTime: "20-30s",
        completed: false
      },
      {
        id: "handstand-kickups",
        name: "Handstand Kick-Ups",
        target: "3×8–10 reps",
        level: "Beginner",
        description: "Practice the kicking motion to get into handstand",
        muscleGroups: ["Shoulders", "Core", "Legs"],
        equipment: ["Wall"],
        sets: 3,
        reps: "8-10",
        completed: true
      },
      {
        id: "tuck-handstand",
        name: "Tuck Handstand Hold",
        target: "3×10–15s",
        level: "Intermediate",
        description: "Freestanding handstand with knees tucked to chest",
        muscleGroups: ["Shoulders", "Core", "Forearms"],
        equipment: ["None"],
        sets: 3,
        holdTime: "10-15s",
        completed: false
      },
      {
        id: "freestanding-handstand",
        name: "Freestanding Handstand",
        target: "3×10–60s",
        level: "Advanced",
        description: "Full freestanding handstand with perfect alignment",
        muscleGroups: ["Full Body"],
        equipment: ["None"],
        sets: 3,
        holdTime: "10-60s",
        completed: false
      },
      {
        id: "handstand-pushup",
        name: "Handstand Push-Up",
        target: "3×3–8 reps",
        level: "Advanced",
        description: "Push-ups performed in handstand position",
        muscleGroups: ["Shoulders", "Triceps", "Core"],
        equipment: ["Wall"],
        sets: 3,
        reps: "3-8",
        completed: false
      }
    ]
  },
  {
    id: "planche",
    title: "Planche & Parallettes",
    icon: <Dumbbell className="h-5 w-5" />,
    color: "planche",
    exercises: [
      {
        id: "planche-lean",
        name: "Planche Lean",
        target: "3×10–20s",
        level: "Beginner",
        description: "Lean forward from push-up position to build planche strength",
        muscleGroups: ["Shoulders", "Core", "Wrists"],
        equipment: ["None"],
        sets: 3,
        holdTime: "10-20s",
        completed: true
      },
      {
        id: "pseudo-planche",
        name: "Pseudo Planche Push-Ups",
        target: "3×8–12 reps",
        level: "Beginner",
        description: "Push-ups with hands positioned lower on torso",
        muscleGroups: ["Shoulders", "Chest", "Core"],
        equipment: ["None"],
        sets: 3,
        reps: "8-12",
        completed: true
      },
      {
        id: "tuck-planche",
        name: "Tuck Planche Hold",
        target: "3×10–15s",
        level: "Intermediate",
        description: "Hold body parallel to ground with knees tucked",
        muscleGroups: ["Shoulders", "Core", "Forearms"],
        equipment: ["Parallettes (optional)"],
        sets: 3,
        holdTime: "10-15s",
        completed: false
      },
      {
        id: "advanced-tuck",
        name: "Advanced Tuck Planche",
        target: "3×5–10s",
        level: "Intermediate",
        description: "Tuck planche with knees closer to chest",
        muscleGroups: ["Shoulders", "Core"],
        equipment: ["Parallettes (optional)"],
        sets: 3,
        holdTime: "5-10s",
        completed: false
      },
      {
        id: "straddle-planche",
        name: "Straddle Planche",
        target: "3×5–10s",
        level: "Advanced",
        description: "Full planche with legs in straddle position",
        muscleGroups: ["Full Body"],
        equipment: ["Parallettes (optional)"],
        sets: 3,
        holdTime: "5-10s",
        completed: false
      }
    ]
  },
  {
    id: "pullup",
    title: "Pull-Up Progressions",
    icon: <ArrowUp className="h-5 w-5" />,
    color: "pullup",
    exercises: [
      {
        id: "australian-rows",
        name: "Australian Rows",
        target: "3×10–15 reps",
        level: "Beginner",
        description: "Horizontal pulling movement to build pull-up strength",
        muscleGroups: ["Lats", "Rhomboids", "Biceps"],
        equipment: ["Pull-up bar", "TRX"],
        sets: 3,
        reps: "10-15",
        completed: true
      },
      {
        id: "negative-pullups",
        name: "Negative Pull-Ups",
        target: "3×4–6 reps",
        level: "Beginner",
        description: "Focus on the lowering portion of the pull-up",
        muscleGroups: ["Lats", "Biceps", "Core"],
        equipment: ["Pull-up bar"],
        sets: 3,
        reps: "4-6",
        completed: true
      },
      {
        id: "standard-pullups",
        name: "Standard Pull-Ups",
        target: "4×6–12 reps",
        level: "Intermediate",
        description: "Full range pull-ups with chin over bar",
        muscleGroups: ["Lats", "Biceps", "Core"],
        equipment: ["Pull-up bar"],
        sets: 4,
        reps: "6-12",
        completed: false
      },
      {
        id: "archer-pullups",
        name: "Archer Pull-Ups",
        target: "3×3–5 each",
        level: "Intermediate",
        description: "Unilateral pull-ups shifting weight to one arm",
        muscleGroups: ["Lats", "Biceps", "Core"],
        equipment: ["Pull-up bar"],
        sets: 3,
        reps: "3-5 each side",
        completed: false
      },
      {
        id: "weighted-pullups",
        name: "Weighted Pull-Ups",
        target: "4×5 (with weight)",
        level: "Advanced",
        description: "Pull-ups with additional weight for strength",
        muscleGroups: ["Lats", "Biceps", "Core"],
        equipment: ["Pull-up bar", "Weight belt"],
        sets: 4,
        reps: "5",
        completed: false
      },
      {
        id: "muscle-up",
        name: "Muscle-Up",
        target: "3×3–5 reps",
        level: "Advanced",
        description: "Transition from pull-up to dip in one movement",
        muscleGroups: ["Full Upper Body"],
        equipment: ["Pull-up bar", "Rings"],
        sets: 3,
        reps: "3-5",
        completed: false
      }
    ]
  },
  {
    id: "rings",
    title: "Rings",
    icon: <CircleDot className="h-5 w-5" />,
    color: "rings",
    exercises: [
      {
        id: "ring-support",
        name: "Ring Support Hold",
        target: "3×10–20s",
        level: "Beginner",
        description: "Hold body weight supported on rings",
        muscleGroups: ["Shoulders", "Core", "Stabilizers"],
        equipment: ["Gymnastic rings"],
        sets: 3,
        holdTime: "10-20s",
        completed: false
      },
      {
        id: "ring-rows",
        name: "Ring Rows",
        target: "3×8–12 reps",
        level: "Beginner",
        description: "Horizontal pulling on rings with feet on ground",
        muscleGroups: ["Lats", "Rhomboids", "Biceps"],
        equipment: ["Gymnastic rings"],
        sets: 3,
        reps: "8-12",
        completed: false
      },
      {
        id: "ring-dips",
        name: "Ring Dips",
        target: "3×6–10 reps",
        level: "Intermediate",
        description: "Dips performed on unstable rings",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        equipment: ["Gymnastic rings"],
        sets: 3,
        reps: "6-10",
        completed: false
      },
      {
        id: "skin-the-cat",
        name: "Skin the Cat",
        target: "3×3–5 reps",
        level: "Intermediate",
        description: "Full rotation through rings with control",
        muscleGroups: ["Shoulders", "Lats", "Core"],
        equipment: ["Gymnastic rings"],
        sets: 3,
        reps: "3-5",
        completed: false
      },
      {
        id: "ring-muscle-up",
        name: "Ring Muscle-Up",
        target: "3×3–5 reps",
        level: "Advanced",
        description: "Muscle-up performed on rings with false grip",
        muscleGroups: ["Full Upper Body"],
        equipment: ["Gymnastic rings"],
        sets: 3,
        reps: "3-5",
        completed: false
      }
    ]
  }
];

const ExerciseLibrary = () => {
  const [activeCategory, setActiveCategory] = useState("handstand");
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleExerciseComplete = (exerciseId: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
      toast({
        title: "Exercise Unmarked",
        description: "Exercise removed from completed list",
      });
    } else {
      newCompleted.add(exerciseId);
      toast({
        title: "Exercise Completed! 🎉",
        description: "Great job! Keep up the momentum.",
      });
    }
    setCompletedExercises(newCompleted);
  };

  const handleStartWorkout = (category: string) => {
    toast({
      title: `Starting ${category} Workout`,
      description: "Timer started! Focus on proper form.",
    });
  };

  const currentCategory = exerciseData.find(cat => cat.id === activeCategory);
  const completedCount = currentCategory?.exercises.filter(ex => completedExercises.has(ex.id)).length || 0;
  const totalCount = currentCategory?.exercises.length || 0;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <Card className="glass-card leather-texture border-2 border-card-border premium-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 primary-gradient rounded-lg flex items-center justify-center gold-shadow">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl text-card-foreground">Exercise Library</CardTitle>
              <p className="text-sm text-muted-foreground">Complete exercise database with progressions</p>
            </div>
          </div>
          <Badge className="bronze-gradient text-primary-foreground">
            {completedCount}/{totalCount} Complete
          </Badge>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Category Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {exerciseData.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center space-x-1"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {exerciseData.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground">{category.title} Exercises</h3>
                <Button 
                  onClick={() => handleStartWorkout(category.title)}
                  className="primary-gradient hover:opacity-90 text-primary-foreground gold-shadow"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Workout
                </Button>
              </div>
              
              <div className="grid gap-4">
                {category.exercises.map((exercise) => {
                  const isCompleted = completedExercises.has(exercise.id);
                  return (
                    <div 
                      key={exercise.id}
                      className={`p-4 rounded-xl border-2 ${category.color}-theme transition-all duration-300 hover:scale-[1.02] ${
                        isCompleted ? 'opacity-100 border-gold/50' : 'opacity-90'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-card-foreground">{exercise.name}</h4>
                            <Badge 
                              variant={exercise.level === "Beginner" ? "secondary" : 
                                     exercise.level === "Intermediate" ? "default" : "outline"}
                              className="text-xs"
                            >
                              {exercise.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center space-x-1">
                              <Target className="h-3 w-3 text-muted-foreground" />
                              <span className="text-card-foreground">{exercise.target}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {exercise.sets} sets
                                {exercise.reps && ` × ${exercise.reps}`}
                                {exercise.holdTime && ` × ${exercise.holdTime}`}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex flex-wrap gap-1">
                            {exercise.muscleGroups.map((muscle, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {muscle}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button
                          variant={isCompleted ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleExerciseComplete(exercise.id)}
                          className={isCompleted ? "bronze-gradient text-primary-foreground" : ""}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <PlayCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExerciseLibrary;