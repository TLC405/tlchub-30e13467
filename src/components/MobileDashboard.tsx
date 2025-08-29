
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
  Flame,
  Brain
} from "lucide-react";
import DetailedWeatherWidget from "./DetailedWeatherWidget";
import TrainingHub from "./TrainingHub";

interface MobileDashboardProps {
  onNavigate: (view: ViewType) => void;
}

const MobileDashboard = ({ onNavigate }: MobileDashboardProps) => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const stats = {
    weekStreak: 3,
    totalWorkouts: 12,
    thisWeek: { completed: 1, total: 4 },
    nextGoal: "Handstand Hold 30s"
  };

  const trainingPillars = [
    {
      id: "handstand",
      title: "Handstand Development",
      emoji: "🤸",
      progress: 25,
      current: "Wall Hold 15s",
      next: "Freestanding 5s",
      color: "handstand",
      level: "BEGINNER"
    },
    {
      id: "planche",
      title: "Planche Progression",
      emoji: "⚡",
      progress: 15,
      current: "Planche Leans", 
      next: "Tuck Planche",
      color: "planche",
      level: "BEGINNER"
    },
    {
      id: "pullup",
      title: "Pull-up Strength",
      emoji: "💪",
      progress: 40,
      current: "8 Reps Max",
      next: "Weighted Pull-ups",
      color: "pullup",
      level: "INTERMEDIATE"
    },
    {
      id: "rings",
      title: "Ring Training",
      emoji: "💍",
      progress: 10,
      current: "Ring Support 20s",
      next: "Ring Dips",
      color: "rings",
      level: "BEGINNER"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-4 space-y-6 mobile-safe-area">
        {/* Header */}
        <div className="text-center space-y-3 py-4">
          <div className="text-4xl font-black text-primary tracking-wider font-serif">
            CALIX<span className="text-accent">TLC</span>
          </div>
          <div className="text-sm font-semibold text-muted-foreground tracking-wide font-mono uppercase">
            Elite Calisthenics Training System
          </div>
          <p className="text-sm text-muted-foreground font-light tracking-wide leading-relaxed px-4">
            Transform your body through movement mastery
          </p>
        </div>

        {/* Detailed Weather Widget */}
        <DetailedWeatherWidget />

        {/* Training Hub */}
        <TrainingHub onNavigate={onNavigate} />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card border border-primary hover:border-primary/80 transition-colors">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-foreground font-mono">{stats.weekStreak}</span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Training Streak
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-accent hover:border-accent/80 transition-colors">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Trophy className="h-5 w-5 text-accent" />
                <span className="text-2xl font-bold text-foreground font-mono">{stats.totalWorkouts}</span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Total Sessions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card className="bg-card border border-primary hover:border-primary/80 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-foreground tracking-wide font-serif text-base">
                Weekly Progress
              </h3>
              <Badge className="bg-primary text-primary-foreground font-bold font-mono text-xs">
                {stats.thisWeek.completed}/{stats.thisWeek.total}
              </Badge>
            </div>
            <Progress 
              value={(stats.thisWeek.completed / stats.thisWeek.total) * 100} 
              className="h-3 mb-3" 
            />
            <p className="text-sm text-muted-foreground font-medium tracking-wide">
              Next Goal: <span className="text-foreground font-semibold">{stats.nextGoal}</span>
            </p>
          </CardContent>
        </Card>

        {/* Training Focus Areas */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground tracking-wide font-serif">
            Training Focus
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {trainingPillars.slice(0, 2).map((pillar) => (
              <Card 
                key={pillar.id}
                className="bg-card border border-primary transition-all duration-300 hover:border-accent cursor-pointer hover:shadow-lg hover:scale-[1.02]"
                onClick={() => onNavigate('enhanced-library')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{pillar.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground text-base font-serif truncate">
                          {pillar.title}
                        </h3>
                        <Badge variant="outline" className="text-xs font-mono shrink-0">
                          {pillar.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium tracking-wide truncate">
                        {pillar.current}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-foreground font-mono">
                        {pillar.progress}%
                      </div>
                    </div>
                  </div>
                  <Progress value={pillar.progress} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground font-medium tracking-wide truncate">
                    Next: {pillar.next}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground tracking-wide font-serif">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              className="h-16 justify-center space-y-2 flex-col border bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold"
              onClick={() => onNavigate('enhanced-library')}
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wide">Exercise Library</span>
            </Button>
            <Button
              className="h-16 justify-center space-y-2 flex-col border bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300 font-semibold"
              onClick={() => onNavigate('agent')}
            >
              <Brain className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wide">Agent TLC</span>
            </Button>
          </div>
        </div>

        {/* Training Insight */}
        <Card className="bg-card border border-warning hover:border-warning/80 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">💡</div>
              <h3 className="font-bold text-warning tracking-wide text-base font-serif">
                Training Insight
              </h3>
            </div>
            <p className="text-sm text-muted-foreground font-light italic tracking-wide leading-relaxed">
              "Progressive overload is key - increase difficulty gradually to avoid injury and ensure consistent growth"
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileDashboard;
