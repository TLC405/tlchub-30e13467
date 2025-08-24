import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Zap,
  Dumbbell,
  ArrowUp,
  CircleDot,
  Play,
  CheckCircle,
  Clock,
  Target
} from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  completed: boolean;
  notes?: string;
}

interface TrainingPillar {
  title: string;
  icon: React.ReactNode;
  color: string;
  exercises: Exercise[];
}

const TrainingView = () => {
  const { toast } = useToast();
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);
  const [exercises, setExercises] = useState<TrainingPillar[]>([
    {
      title: "Handstand",
      icon: <Zap className="h-6 w-6" />,
      color: "handstand",
      exercises: [
        { name: "Wall Handstand Hold", sets: 3, reps: "20-30s", rest: "60s", completed: false },
        { name: "Handstand Kick-ups", sets: 3, reps: "8-10", rest: "45s", completed: false },
        { name: "Hollow Body Hold", sets: 3, reps: "30s", rest: "45s", completed: false },
        { name: "Wrist Warm-up", sets: 2, reps: "10 circles each", rest: "30s", completed: false }
      ]
    },
    {
      title: "Planche",
      icon: <Dumbbell className="h-6 w-6" />,
      color: "planche",
      exercises: [
        { name: "Planche Leans", sets: 3, reps: "15-20s", rest: "60s", completed: false },
        { name: "Tuck Planche Hold", sets: 3, reps: "10-15s", rest: "90s", completed: false },
        { name: "Pseudo Planche Push-ups", sets: 3, reps: "8-12", rest: "60s", completed: false },
        { name: "L-Sit Hold", sets: 3, reps: "15-20s", rest: "60s", completed: false }
      ]
    },
    {
      title: "Pull-ups",
      icon: <ArrowUp className="h-6 w-6" />,
      color: "pullup",
      exercises: [
        { name: "Standard Pull-ups", sets: 4, reps: "6-8", rest: "90s", completed: false },
        { name: "Archer Pull-ups", sets: 3, reps: "3-5 each", rest: "120s", completed: false },
        { name: "Australian Rows", sets: 3, reps: "10-15", rest: "60s", completed: false },
        { name: "Dead Hangs", sets: 3, reps: "30-45s", rest: "60s", completed: false }
      ]
    },
    {
      title: "Rings",
      icon: <CircleDot className="h-6 w-6" />,
      color: "rings",
      exercises: [
        { name: "Ring Support Hold", sets: 3, reps: "15-20s", rest: "60s", completed: false },
        { name: "Ring Dips", sets: 3, reps: "6-10", rest: "90s", completed: false },
        { name: "Ring Rows", sets: 3, reps: "8-12", rest: "60s", completed: false },
        { name: "Skin the Cat", sets: 3, reps: "3-5", rest: "90s", completed: false }
      ]
    }
  ]);

  const toggleExerciseComplete = (pillarIndex: number, exerciseIndex: number) => {
    setExercises(prev => {
      const newExercises = [...prev];
      newExercises[pillarIndex].exercises[exerciseIndex].completed = 
        !newExercises[pillarIndex].exercises[exerciseIndex].completed;
      
      const exercise = newExercises[pillarIndex].exercises[exerciseIndex];
      
      toast({
        title: exercise.completed ? "Exercise Completed! 💪" : "Exercise Marked Incomplete",
        description: exercise.name,
      });
      
      return newExercises;
    });
  };

  const getCompletionPercentage = (pillar: TrainingPillar) => {
    const completed = pillar.exercises.filter(ex => ex.completed).length;
    return Math.round((completed / pillar.exercises.length) * 100);
  };

  const getTotalCompletion = () => {
    const totalExercises = exercises.reduce((sum, pillar) => sum + pillar.exercises.length, 0);
    const completedExercises = exercises.reduce((sum, pillar) => 
      sum + pillar.exercises.filter(ex => ex.completed).length, 0);
    return Math.round((completedExercises / totalExercises) * 100);
  };

  if (selectedPillar !== null) {
    const pillar = exercises[selectedPillar];
    const completion = getCompletionPercentage(pillar);
    
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedPillar(null)}
            >
              ← Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 primary-gradient rounded-lg flex items-center justify-center gold-shadow">
                {pillar.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">{pillar.title} Training</h1>
                <p className="text-muted-foreground">{completion}% Complete</p>
              </div>
            </div>
          </div>
          
          <Badge className="bronze-gradient text-primary-foreground">
            {pillar.exercises.filter(ex => ex.completed).length} / {pillar.exercises.length}
          </Badge>
        </div>

        <Progress value={completion} className="h-3" />

        <div className="space-y-4">
          {pillar.exercises.map((exercise, index) => (
            <Card 
              key={index}
              className={`glass-card border-2 transition-all duration-300 ${
                exercise.completed 
                  ? 'border-green-500/50 bg-green-500/10' 
                  : 'border-card-border hover:border-primary/30'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      variant={exercise.completed ? "default" : "outline"}
                      onClick={() => toggleExerciseComplete(selectedPillar, index)}
                      className={exercise.completed ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {exercise.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <div>
                      <h3 className={`font-semibold ${
                        exercise.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
                      }`}>
                        {exercise.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>{exercise.sets} sets</span>
                        </span>
                        <span>{exercise.reps}</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{exercise.rest} rest</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {exercise.completed && (
                    <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                      Complete
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-card-foreground">Training</h1>
        <p className="text-muted-foreground">Choose your training focus for today</p>
      </div>

      {/* Overall Progress */}
      <Card className="glass-card border-card-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Overall Progress</h3>
            <Badge className="bronze-gradient text-primary-foreground">
              {getTotalCompletion()}%
            </Badge>
          </div>
          <Progress value={getTotalCompletion()} className="h-3" />
        </CardContent>
      </Card>

      {/* Training Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((pillar, index) => {
          const completion = getCompletionPercentage(pillar);
          
          return (
            <Card 
              key={index}
              className={`glass-card leather-texture border-2 ${pillar.color}-theme premium-shadow transition-all duration-300 hover:scale-105 cursor-pointer`}
              onClick={() => setSelectedPillar(index)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 primary-gradient rounded-lg flex items-center justify-center gold-shadow">
                      {pillar.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-card-foreground">{pillar.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {pillar.exercises.length} exercises
                      </p>
                    </div>
                  </div>
                  
                  <Badge className="bronze-gradient text-primary-foreground">
                    {completion}%
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Progress value={completion} className="h-2" />
                
                <div className="space-y-2">
                  {pillar.exercises.slice(0, 3).map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="flex items-center justify-between text-sm">
                      <span className={`${
                        exercise.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
                      }`}>
                        {exercise.name}
                      </span>
                      {exercise.completed && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))}
                  {pillar.exercises.length > 3 && (
                    <p className="text-xs text-muted-foreground">
                      +{pillar.exercises.length - 3} more exercises
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingView;