import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { ViewType } from "@/types";
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  BookOpen,
  Timer,
  Trophy,
  Zap,
  Target,
  ArrowUp,
  CircleDot,
  Clock,
  Calendar,
  Flame
} from "lucide-react";

interface MobileDashboardProps {
  onNavigate: (view: ViewType) => void;
}

const MobileDashboard = ({ onNavigate }: MobileDashboardProps) => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const stats = {
    weekStreak: 12,
    totalWorkouts: 47,
    thisWeek: { completed: 3, total: 4 },
    nextGoal: "30s Handstand"
  };

  const trainingPillars = [
    {
      id: "handstand",
      title: "Handstand",
      emoji: "🤸‍♂️",
      progress: 65,
      current: "Wall Hold 45s",
      next: "Freestanding 10s",
      color: "handstand",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      id: "planche",
      title: "Planche",
      emoji: "💪",
      progress: 45,
      current: "Tuck Hold 15s",
      next: "Advanced Tuck",
      color: "planche",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      id: "pullup",
      title: "Pull-ups",
      emoji: "🏋️‍♂️",
      progress: 75,
      current: "8 reps",
      next: "Weighted +10kg",
      color: "pullup",
      gradient: "from-emerald-500 to-green-700"
    },
    {
      id: "rings",
      title: "Rings",
      emoji: "⭕",
      progress: 30,
      current: "Support 20s",
      next: "Ring Dips",
      color: "rings",
      gradient: "from-purple-500 to-indigo-700"
    }
  ];

  const quickActions = [
    { title: "Start Timer", icon: Timer, view: 'timer' as ViewType, color: "from-primary to-accent" },
    { title: "Exercise Library", icon: BookOpen, view: 'library' as ViewType, color: "from-secondary to-primary" },
    { title: "Progress", icon: TrendingUp, view: 'progress' as ViewType, color: "from-success to-emerald-600" }
  ];

  return (
    <div className="p-4 space-y-6 mobile-safe-area">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Gravitas Fit
        </h1>
        <p className="text-muted-foreground">Ready to level up? 🚀</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="glass-card border border-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Flame className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">{stats.weekStreak}</span>
            </div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="glass-card border border-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Trophy className="h-5 w-5 text-accent" />
              <span className="text-2xl font-bold text-foreground">{stats.totalWorkouts}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Workouts</p>
          </CardContent>
        </Card>
      </div>

      {/* This Week Progress */}
      <Card className="glass-card border-2 border-border glow-effect">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">This Week</h3>
            <Badge className="vibrant-gradient text-primary-foreground">
              {stats.thisWeek.completed}/{stats.thisWeek.total}
            </Badge>
          </div>
          <Progress 
            value={(stats.thisWeek.completed / stats.thisWeek.total) * 100} 
            className="h-3 mb-2" 
          />
          <p className="text-xs text-muted-foreground">
            Next Goal: {stats.nextGoal}
          </p>
        </CardContent>
      </Card>

      {/* Training Pillars */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Training Focus</h2>
        <div className="grid grid-cols-1 gap-3">
          {trainingPillars.map((pillar) => (
            <Card 
              key={pillar.id}
              className={`glass-card border-2 ${pillar.color}-theme transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
              onClick={() => onNavigate('training')}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-2xl">{pillar.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{pillar.title}</h3>
                    <p className="text-xs text-muted-foreground">{pillar.current}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{pillar.progress}%</div>
                  </div>
                </div>
                <Progress value={pillar.progress} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">Next: {pillar.next}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className={`h-16 justify-start space-x-4 border-2 bg-gradient-to-r ${action.color} border-transparent text-white hover:opacity-90 transition-all duration-300 vibrant-shadow`}
                onClick={() => onNavigate(action.view)}
              >
                <Icon className="h-6 w-6" />
                <span className="text-lg font-semibold">{action.title}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Today's Motivation */}
      <Card className="glass-card border-2 border-primary/30 glow-effect">
        <CardContent className="p-4 text-center">
          <div className="text-3xl mb-2">💪</div>
          <h3 className="font-bold text-primary mb-1">Today's Focus</h3>
          <p className="text-sm text-muted-foreground">
            "Every rep gets you closer to your goals!"
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDashboard;