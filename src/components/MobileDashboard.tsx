
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
import WeatherWidget from "./WeatherWidget";
import AchievementSystem from "./AchievementSystem";

interface MobileDashboardProps {
  onNavigate: (view: ViewType) => void;
}

const MobileDashboard = ({ onNavigate }: MobileDashboardProps) => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const stats = {
    weekStreak: 0,
    totalWorkouts: 0,
    thisWeek: { completed: 0, total: 4 },
    nextGoal: "Begin Training"
  };

  const trainingPillars = [
    {
      id: "handstand",
      title: "Handstand Training",
      emoji: "🎯",
      progress: 0,
      current: "Not Started",
      next: "Wall Handstand",
      color: "handstand",
      level: "BEGINNER"
    },
    {
      id: "planche",
      title: "Planche Development",
      emoji: "⚡",
      progress: 0,
      current: "Not Started", 
      next: "Planche Leans",
      color: "planche",
      level: "INTERMEDIATE"
    },
    {
      id: "pullup",
      title: "Pull-up Mastery",
      emoji: "💪",
      progress: 0,
      current: "Not Started",
      next: "Australian Rows",
      color: "pullup",
      level: "BEGINNER"
    },
    {
      id: "rings",
      title: "Ring Training",
      emoji: "🔴",
      progress: 0,
      current: "Not Started",
      next: "Ring Support",
      color: "rings",
      level: "ADVANCED"
    }
  ];

  return (
    <div className="p-3 space-y-4 mobile-safe-area">
      {/* Header */}
      <div className="text-center space-y-1 py-3">
        <div className="text-2xl font-black text-primary tracking-wider">
          CALIX<span className="text-accent">TLC</span>
        </div>
        <div className="text-xs font-medium text-muted-foreground tracking-wide">
          [ ELITE CALISTHENICS TRAINING ]
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Ready to train? 💪
        </p>
      </div>

      {/* Weather Widget */}
      <WeatherWidget />

      {/* Achievement System */}
      <AchievementSystem />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-card border border-primary">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-xl font-bold text-foreground">{stats.weekStreak}</span>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">TRAINING STREAK</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-accent">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Trophy className="h-4 w-4 text-accent" />
              <span className="text-xl font-bold text-foreground">{stats.totalWorkouts}</span>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">WORKOUTS</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="bg-card border border-primary">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground tracking-wide">WEEKLY PROGRESS</h3>
            <Badge className="bg-primary text-primary-foreground font-bold">
              {stats.thisWeek.completed}/{stats.thisWeek.total}
            </Badge>
          </div>
          <Progress 
            value={(stats.thisWeek.completed / stats.thisWeek.total) * 100} 
            className="h-2 mb-2" 
          />
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            NEXT GOAL: {stats.nextGoal}
          </p>
        </CardContent>
      </Card>

      {/* Training Categories */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-foreground tracking-wide">TRAINING CATEGORIES</h2>
        <div className="grid grid-cols-1 gap-2">
          {trainingPillars.slice(0, 2).map((pillar) => (
            <Card 
              key={pillar.id}
              className={`bg-card border border-primary transition-all duration-300 hover:border-accent cursor-pointer`}
              onClick={() => onNavigate('enhanced-library')}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-lg">{pillar.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm">{pillar.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {pillar.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{pillar.current}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-foreground">{pillar.progress}%</div>
                  </div>
                </div>
                <Progress value={pillar.progress} className="h-1 mb-1" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">NEXT: {pillar.next}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-foreground tracking-wide">QUICK ACCESS</h2>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="h-12 justify-center space-y-1 flex-col border bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            onClick={() => onNavigate('enhanced-library')}
          >
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-semibold">LIBRARY</span>
          </Button>
          <Button
            className="h-12 justify-center space-y-1 flex-col border bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300"
            onClick={() => onNavigate('ai')}
          >
            <Timer className="h-4 w-4" />
            <span className="text-xs font-semibold">AI COACH</span>
          </Button>
        </div>
      </div>

      {/* Training Tip */}
      <Card className="bg-card border border-warning">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-lg">💡</div>
            <h3 className="font-bold text-warning tracking-wide text-sm">TRAINING TIP</h3>
          </div>
          <p className="text-xs text-muted-foreground italic">
            "Start with wall handstands to build shoulder stability and proper alignment"
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDashboard;
