import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { ViewType } from "@/types";
import {
  Zap,
  Dumbbell,
  ArrowUp,
  CircleDot,
  TrendingUp,
  Calendar,
  Target,
  Clock,
  Timer,
  BookOpen
} from "lucide-react";

interface DashboardProps {
  onNavigate: (view: ViewType) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const trainingPillars = [
    {
      title: "Handstand",
      icon: <Zap className="h-6 w-6" />,
      progress: 65,
      current: "Wall Hold 45s",
      next: "Freestanding 10s",
      color: "handstand"
    },
    {
      title: "Planche",
      icon: <Dumbbell className="h-6 w-6" />,
      progress: 45,
      current: "Tuck Hold 15s",
      next: "Advanced Tuck",
      color: "planche"
    },
    {
      title: "Pull-ups",
      icon: <ArrowUp className="h-6 w-6" />,
      progress: 75,
      current: "8 reps",
      next: "Weighted +10kg",
      color: "pullup"
    },
    {
      title: "Rings",
      icon: <CircleDot className="h-6 w-6" />,
      progress: 30,
      current: "Support 20s",
      next: "Ring Dips",
      color: "rings"
    }
  ];

  const todaysWorkout = {
    focus: "Handstand & Pull-ups",
    exercises: 6,
    duration: "45 min",
    completed: false
  };

  const weeklyStats = {
    workoutsCompleted: 3,
    totalWorkouts: 4,
    totalTime: "2h 15m",
    streak: 12
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gold-light via-bronze to-gold-dark bg-clip-text text-transparent">
          Welcome back, Athlete
        </h1>
        <p className="text-muted-foreground">Ready to push your limits today?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-card-foreground">
                  {weeklyStats.workoutsCompleted}/{weeklyStats.totalWorkouts}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold text-card-foreground">{weeklyStats.totalTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-2xl font-bold text-card-foreground">{weeklyStats.streak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold text-card-foreground">+15%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Workout */}
      <Card className="glass-card leather-texture border-2 border-card-border premium-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-card-foreground">Today's Workout</CardTitle>
            <Badge className="bronze-gradient text-primary-foreground">
              {todaysWorkout.focus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Exercises</p>
              <p className="text-2xl font-bold text-card-foreground">{todaysWorkout.exercises}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-2xl font-bold text-card-foreground">{todaysWorkout.duration}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-2xl font-bold text-accent">Ready</p>
            </div>
          </div>
          <Button 
            className="w-full primary-gradient hover:opacity-90 text-primary-foreground gold-shadow"
            onClick={() => onNavigate('training')}
          >
            Start Today's Workout
          </Button>
        </CardContent>
      </Card>

      {/* Training Pillars Overview */}
      <Card className="glass-card leather-texture border-2 border-card-border premium-shadow">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground">Training Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingPillars.map((pillar, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border-2 ${pillar.color}-theme transition-all duration-300 hover:scale-105 cursor-pointer`}
                onClick={() => onNavigate('training')}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 primary-gradient rounded-lg flex items-center justify-center gold-shadow">
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{pillar.title}</h3>
                      <p className="text-sm text-muted-foreground">{pillar.current}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-card-foreground">{pillar.progress}%</p>
                  </div>
                </div>
                
                <Progress value={pillar.progress} className="h-2 mb-2" />
                
                <p className="text-xs text-muted-foreground">
                  Next: {pillar.next}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="h-20 flex-col space-y-2 hover:bg-background-secondary/50"
          onClick={() => onNavigate('timer')}
        >
          <Timer className="h-6 w-6" />
          <span>Start Timer</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col space-y-2 hover:bg-background-secondary/50"
          onClick={() => onNavigate('library')}
        >
          <BookOpen className="h-6 w-6" />
          <span>Exercise Library</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col space-y-2 hover:bg-background-secondary/50"
          onClick={() => onNavigate('progress')}
        >
          <TrendingUp className="h-6 w-6" />
          <span>View Progress</span>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;