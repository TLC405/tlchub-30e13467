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

  // No fake progress data - start fresh
  const stats = {
    weekStreak: 0,
    totalWorkouts: 0,
    thisWeek: { completed: 0, total: 4 },
    nextGoal: "Begin Training"
  };

  const trainingPillars = [
    {
      id: "handstand",
      title: "Handstand Ops",
      emoji: "🎯",
      progress: 0,
      current: "Not Started",
      next: "Wall Handstand",
      color: "handstand",
      division: "AMBER"
    },
    {
      id: "planche",
      title: "Planche Force",
      emoji: "⚡",
      progress: 0,
      current: "Not Started", 
      next: "Planche Leans",
      color: "planche",
      division: "GOLD"
    },
    {
      id: "pullup",
      title: "Pull-up Squad",
      emoji: "🪖",
      progress: 0,
      current: "Not Started",
      next: "Australian Rows",
      color: "pullup",
      division: "GREEN"
    },
    {
      id: "rings",
      title: "Rings Unit",
      emoji: "🔴",
      progress: 0,
      current: "Not Started",
      next: "Ring Support",
      color: "rings",
      division: "RED"
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
      <div className="text-center space-y-2 py-6">
        <div className="tactical-font text-4xl font-black text-primary tracking-wider drop-shadow-lg">
          CALIS<span className="text-accent">X</span>TLC
        </div>
        <div className="text-sm font-medium text-muted-foreground tracking-wide">
          [ ELITE TACTICAL CALISTHENICS ]
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          READY FOR DEPLOYMENT? 🎯
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="glass-card skeuomorphic-button border border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold tactical-font text-foreground">{stats.weekStreak}</span>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">MISSION STREAK</p>
          </CardContent>
        </Card>

        <Card className="glass-card skeuomorphic-button border border-accent/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Trophy className="h-5 w-5 text-accent" />
              <span className="text-2xl font-bold tactical-font text-foreground">{stats.totalWorkouts}</span>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">OPERATIONS</p>
          </CardContent>
        </Card>
      </div>

      {/* Mission Status */}
      <Card className="glass-card border-2 border-primary/30 combat-glow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground tactical-font tracking-wide">WEEKLY MISSION</h3>
            <Badge className="tactical-gradient text-primary-foreground font-bold">
              {stats.thisWeek.completed}/{stats.thisWeek.total}
            </Badge>
          </div>
          <Progress 
            value={(stats.thisWeek.completed / stats.thisWeek.total) * 100} 
            className="h-3 mb-2" 
          />
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            PRIMARY OBJECTIVE: {stats.nextGoal}
          </p>
        </CardContent>
      </Card>

      {/* Training Divisions */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-foreground tactical-font tracking-wide">TRAINING DIVISIONS</h2>
        <div className="grid grid-cols-1 gap-3">
          {trainingPillars.map((pillar) => (
            <Card 
              key={pillar.id}
              className={`glass-card skeuomorphic-button border-2 ${pillar.color}-theme transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
              onClick={() => onNavigate('training')}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-2xl">{pillar.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground tactical-font">{pillar.title}</h3>
                      <Badge variant="outline" className="text-xs tactical-font">
                        {pillar.division}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{pillar.current}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground tactical-font">{pillar.progress}%</div>
                  </div>
                </div>
                <Progress value={pillar.progress} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">NEXT: {pillar.next}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Deploy */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-foreground tactical-font tracking-wide">QUICK DEPLOY</h2>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                className={`skeuomorphic-button h-16 justify-start space-x-4 border-2 tactical-gradient text-primary-foreground hover:opacity-90 transition-all duration-300 tactical-shadow tactical-font`}
                onClick={() => onNavigate(action.view)}
              >
                <Icon className="h-6 w-6" />
                <span className="text-lg font-semibold tracking-wide">{action.title.toUpperCase()}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Mission Brief */}
      <Card className="glass-card border-2 border-primary/30 combat-glow">
        <CardContent className="p-4 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="font-bold text-primary mb-1 tactical-font tracking-wide">MISSION BRIEF</h3>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            "DISCIPLINE BUILDS WARRIORS"
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDashboard;