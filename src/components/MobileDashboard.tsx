
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
  Brain,
  Settings
} from "lucide-react";
import DetailedWeatherWidget from "./DetailedWeatherWidget";
import TrainingHub from "./TrainingHub";
import ThemeSelector from "./ThemeSelector";

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
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-md mx-auto p-4 space-y-6 mobile-safe-area">
        {/* Enhanced Header with Theme Selector */}
        <div className="text-center space-y-4 py-6 relative">
          <div className="absolute top-0 right-0">
            <ThemeSelector />
          </div>
          
          <div className="space-y-3">
            <div className="text-4xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-wider font-serif">
              CALIX<span className="text-accent">TLC</span>
            </div>
            <div className="text-sm font-bold text-muted-foreground tracking-widest font-mono uppercase">
              Elite Calisthenics Training System
            </div>
            <p className="text-sm text-muted-foreground font-light tracking-wide leading-relaxed px-6">
              Transform your body through movement mastery and intelligent training
            </p>
          </div>
          
          {/* Enhanced Status Indicators */}
          <div className="flex justify-center items-center gap-3 pt-2">
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-primary">Live</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 bg-accent/10 rounded-full">
              <Target className="w-3 h-3 text-accent" />
              <span className="text-xs font-medium text-accent">Active</span>
            </div>
          </div>
        </div>

        {/* Detailed Weather Widget */}
        <DetailedWeatherWidget />

        {/* Training Hub */}
        <TrainingHub onNavigate={onNavigate} />

        {/* Enhanced Stats Cards with Gradients */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-card via-card/95 to-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardContent className="p-5 text-center">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="p-2 bg-primary/20 rounded-xl">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <span className="text-3xl font-bold text-foreground font-mono tracking-tight">{stats.weekStreak}</span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Training Streak
              </p>
              <div className="mt-2 text-xs text-primary font-medium">
                🔥 Keep it going!
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card via-card/95 to-accent/5 border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CardContent className="p-5 text-center">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="p-2 bg-accent/20 rounded-xl">
                  <Trophy className="h-5 w-5 text-accent" />
                </div>
                <span className="text-3xl font-bold text-foreground font-mono tracking-tight">{stats.totalWorkouts}</span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Total Sessions
              </p>
              <div className="mt-2 text-xs text-accent font-medium">
                💪 Strong progress
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Weekly Progress */}
        <Card className="bg-gradient-to-br from-card to-secondary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground tracking-wide font-serif text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Weekly Progress
              </h3>
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold font-mono text-sm px-3 py-1">
                  {stats.thisWeek.completed}/{stats.thisWeek.total}
                </Badge>
              </div>
            </div>
            <Progress 
              value={(stats.thisWeek.completed / stats.thisWeek.total) * 100} 
              className="h-4 mb-4 bg-muted" 
            />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium tracking-wide flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Next Goal: <span className="text-foreground font-bold">{stats.nextGoal}</span>
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Estimated completion: 2 more sessions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Training Focus Areas */}
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-foreground tracking-wide font-serif flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Training Focus
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {trainingPillars.slice(0, 2).map((pillar) => (
              <Card 
                key={pillar.id}
                className="bg-gradient-to-br from-card via-card/98 to-primary/5 border-2 border-primary/20 transition-all duration-300 hover:border-accent/40 cursor-pointer hover:shadow-xl hover:scale-[1.02] group"
                onClick={() => onNavigate('enhanced-library')}
              >
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl">
                      {pillar.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-foreground text-base font-serif truncate group-hover:text-primary transition-colors">
                          {pillar.title}
                        </h3>
                        <Badge variant="outline" className="text-xs font-mono shrink-0 border-primary/30">
                          {pillar.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium tracking-wide truncate">
                        Current: {pillar.current}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-bold text-primary font-mono">
                        {pillar.progress}%
                      </div>
                      <ArrowUp className="h-4 w-4 text-accent mx-auto mt-1" />
                    </div>
                  </div>
                  <Progress value={pillar.progress} className="h-3 mb-3 bg-muted" />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-medium tracking-wide truncate">
                      <span className="text-accent font-semibold">Next:</span> {pillar.next}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <TrendingUp className="h-3 w-3" />
                      <span className="font-medium">Progress</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Access */}
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-foreground tracking-wide font-serif flex items-center gap-2">
            <Zap className="h-6 w-6 text-accent" />
            Quick Access
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              className="h-20 justify-center space-y-3 flex-col border-2 bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground hover:from-primary/90 hover:via-primary/85 hover:to-primary/70 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              onClick={() => onNavigate('enhanced-library')}
            >
              <BookOpen className="h-6 w-6" />
              <span className="text-sm font-bold tracking-wide">Exercise Library</span>
            </Button>
            <Button
              className="h-20 justify-center space-y-3 flex-col border-2 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:via-secondary/85 hover:to-secondary/70 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              onClick={() => onNavigate('agent')}
            >
              <Brain className="h-6 w-6" />
              <span className="text-sm font-bold tracking-wide">Agent TLC</span>
            </Button>
          </div>
        </div>

        {/* Enhanced Training Insight */}
        <Card className="bg-gradient-to-br from-card to-orange-50/50 dark:to-orange-950/20 border-2 border-orange-200/50 dark:border-orange-800/50 hover:border-orange-300/60 transition-all duration-300 shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl p-3 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 rounded-2xl">
                💡
              </div>
              <h3 className="font-bold text-orange-700 dark:text-orange-300 tracking-wide text-lg font-serif">
                Daily Training Insight
              </h3>
            </div>
            <p className="text-sm text-muted-foreground font-medium italic tracking-wide leading-relaxed">
              "Progressive overload is the foundation of all strength gains. Increase difficulty gradually—your body adapts to consistent challenges, not sporadic intense sessions."
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400">
              <Brain className="h-3 w-3" />
              <span className="font-semibold">Evidence-based training principle</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileDashboard;
