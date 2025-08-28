import { useState } from "react";
import { Calendar, Clock, Target, Play, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface WorkoutDay {
  day: string;
  date: string;
  workoutType: string;
  focus: string;
  duration: string;
  completed: boolean;
  isToday: boolean;
  exercises: {
    name: string;
    sets?: string;
    reps?: string;
    hold?: string;
  }[];
}

const weeklyPlanData: WorkoutDay[] = [
  {
    day: "Mon",
    date: "Dec 23",
    workoutType: "Strength & Skills",
    focus: "Full Body",
    duration: "45-60 min",
    completed: true,
    isToday: false,
    exercises: [
      { name: "Push-up Progression", sets: "3", reps: "8-12" },
      { name: "Pull-up Progression", sets: "3", reps: "5-8" },
      { name: "Handstand Practice", hold: "30s", sets: "3" },
      { name: "L-sit Progression", hold: "15-30s", sets: "3" }
    ]
  },
  {
    day: "Tue",
    date: "Dec 24",
    workoutType: "Active Recovery",
    focus: "Mobility & Yoga",
    duration: "30-45 min",
    completed: true,
    isToday: false,
    exercises: [
      { name: "Morning Flow", hold: "5 min" },
      { name: "Hip Mobility", hold: "10 min" },
      { name: "Shoulder Stretches", hold: "10 min" },
      { name: "Deep Breathing", hold: "5 min" }
    ]
  },
  {
    day: "Wed",
    date: "Dec 25",
    workoutType: "Strength & Skills",
    focus: "Full Body",
    duration: "45-60 min",
    completed: false,
    isToday: true,
    exercises: [
      { name: "Planche Progression", hold: "20s", sets: "4" },
      { name: "Front Lever Progression", hold: "15s", sets: "4" },
      { name: "Muscle-up Training", sets: "3", reps: "3-5" },
      { name: "Core Conditioning", sets: "3", reps: "10-15" }
    ]
  },
  {
    day: "Thu",
    date: "Dec 26",
    workoutType: "Active Recovery",
    focus: "Cardio & Core",
    duration: "30-40 min",
    completed: false,
    isToday: false,
    exercises: [
      { name: "Light Cardio", hold: "15 min" },
      { name: "Core Circuit", sets: "3", reps: "12-15" },
      { name: "Flexibility Work", hold: "15 min" }
    ]
  },
  {
    day: "Fri",
    date: "Dec 27",
    workoutType: "Strength & Skills",
    focus: "Full Body",
    duration: "45-60 min",
    completed: false,
    isToday: false,
    exercises: [
      { name: "Human Flag Progression", hold: "10s", sets: "3" },
      { name: "Advanced Push-ups", sets: "3", reps: "5-10" },
      { name: "Advanced Pull-ups", sets: "3", reps: "5-8" },
      { name: "Handstand Flow", hold: "45s", sets: "3" }
    ]
  },
  {
    day: "Sat",
    date: "Dec 28",
    workoutType: "Skill Focus",
    focus: "Specialty Skills",
    duration: "60-75 min",
    completed: false,
    isToday: false,
    exercises: [
      { name: "Freestyle Practice", hold: "20 min" },
      { name: "Flow Combinations", sets: "5", reps: "1-3" },
      { name: "Skill Refinement", hold: "30 min" }
    ]
  },
  {
    day: "Sun",
    date: "Dec 29",
    workoutType: "Rest Day",
    focus: "Recovery",
    duration: "Optional",
    completed: false,
    isToday: false,
    exercises: [
      { name: "Gentle Stretching", hold: "20 min" },
      { name: "Meditation", hold: "10 min" },
      { name: "Light Walk", hold: "30 min" }
    ]
  }
];

const WeeklyPlan = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStartWorkout = (day: string, workoutType: string) => {
    toast({
      title: "Workout Started",
      description: `Starting ${workoutType} for ${day}`,
    });
  };

  const getWorkoutTypeColor = (workoutType: string) => {
    switch (workoutType) {
      case "Strength & Skills": return "border-l-red-500 bg-red-950/10";
      case "Active Recovery": return "border-l-blue-500 bg-blue-950/10";
      case "Skill Focus": return "border-l-purple-500 bg-purple-950/10";
      case "Rest Day": return "border-l-gray-500 bg-gray-950/10";
      default: return "border-l-gray-500 bg-gray-950/10";
    }
  };

  const getCompletedWorkouts = () => {
    return weeklyPlanData.filter(day => day.completed).length;
  };

  const getWeekProgress = () => {
    const workoutDays = weeklyPlanData.filter(day => day.workoutType !== "Rest Day");
    const completedWorkouts = workoutDays.filter(day => day.completed).length;
    return (completedWorkouts / workoutDays.length) * 100;
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Weekly Training Plan</h1>
        <p className="text-muted-foreground">Your structured calisthenics journey</p>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Week Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Weekly Progress</span>
              <span className="text-sm font-medium">
                {getCompletedWorkouts()}/{weeklyPlanData.filter(d => d.workoutType !== "Rest Day").length} Workouts
              </span>
            </div>
            <Progress value={getWeekProgress()} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              {Math.round(getWeekProgress())}% Complete
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {weeklyPlanData.map((workout) => (
          <Card 
            key={workout.day} 
            className={`border-l-4 ${getWorkoutTypeColor(workout.workoutType)} ${
              workout.isToday ? 'ring-2 ring-primary' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="font-bold text-lg">{workout.day}</div>
                    <div className="text-xs text-muted-foreground">{workout.date}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{workout.workoutType}</h3>
                      {workout.isToday && (
                        <Badge variant="secondary" className="bg-blue-600 text-white">Today</Badge>
                      )}
                      {workout.completed && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {workout.focus}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {workout.duration}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDay(selectedDay === workout.day ? null : workout.day)}
                  >
                    {selectedDay === workout.day ? "Hide" : "View"}
                  </Button>
                  {!workout.completed && workout.workoutType !== "Rest Day" && (
                    <Button
                      size="sm"
                      onClick={() => handleStartWorkout(workout.day, workout.workoutType)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  )}
                </div>
              </div>

              {selectedDay === workout.day && (
                <div className="mt-4 pt-3 border-t border-border">
                  <h4 className="font-medium mb-2 text-sm">Today's Exercises:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-card-secondary rounded">
                        <span className="font-medium text-sm">{exercise.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {exercise.sets && `${exercise.sets} sets × `}
                          {exercise.reps || exercise.hold}
                        </span>
                      </div>
                    ))}
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

export default WeeklyPlan;