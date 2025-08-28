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
    { title: "AI Assistant", icon: Timer, view: 'ai' as ViewType, color: "from-primary to-accent" },
    { title: "Enhanced Library", icon: BookOpen, view: 'enhanced-library' as ViewType, color: "from-secondary to-primary" },
    { title: "File Manager", icon: Calendar, view: 'files' as ViewType, color: "from-success to-emerald-600" },
    { title: "Weekly Plan", icon: Trophy, view: 'plan' as ViewType, color: "from-warning to-amber-600" }
  ];

  return (
    <div className="p-3 space-y-4 mobile-safe-area">
      {/* Header */}
      <div className="text-center space-y-1 py-3">
        <div className="tactical-font text-2xl font-black text-primary tracking-wider">
          CALIS<span className="text-accent">X</span>TLC
        </div>
        <div className="text-xs font-medium text-muted-foreground tracking-wide">
          [ ELITE TACTICAL CALISTHENICS ]
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          READY FOR DEPLOYMENT? 🎯
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-card border border-primary">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-xl font-bold tactical-font text-foreground">{stats.weekStreak}</span>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">MISSION STREAK</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-accent">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Trophy className="h-4 w-4 text-accent" />
              <span className="text-xl font-bold tactical-font text-foreground">{stats.totalWorkouts}</span>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">OPERATIONS</p>
          </CardContent>
        </Card>
      </div>

      {/* Mission Status */}
      <Card className="bg-card border border-primary">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground tactical-font tracking-wide">WEEKLY MISSION</h3>
            <Badge className="bg-primary text-primary-foreground font-bold">
              {stats.thisWeek.completed}/{stats.thisWeek.total}
            </Badge>
          </div>
          <Progress 
            value={(stats.thisWeek.completed / stats.thisWeek.total) * 100} 
            className="h-2 mb-2" 
          />
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            PRIMARY OBJECTIVE: {stats.nextGoal}
          </p>
        </CardContent>
      </Card>

      {/* Training Divisions */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-foreground tactical-font tracking-wide">TRAINING DIVISIONS</h2>
        <div className="grid grid-cols-1 gap-2">
          {trainingPillars.map((pillar) => (
            <Card 
              key={pillar.id}
              className={`bg-card border border-primary transition-all duration-300 hover:border-accent cursor-pointer`}
              onClick={() => onNavigate('training')}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-lg">{pillar.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground tactical-font text-sm">{pillar.title}</h3>
                      <Badge variant="outline" className="text-xs tactical-font">
                        {pillar.division}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{pillar.current}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-foreground tactical-font">{pillar.progress}%</div>
                  </div>
                </div>
                <Progress value={pillar.progress} className="h-1 mb-1" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">NEXT: {pillar.next}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Deploy */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-foreground tactical-font tracking-wide">QUICK DEPLOY</h2>
        <div className="grid grid-cols-1 gap-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                className={`h-12 justify-start space-x-3 border bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 tactical-font`}
                onClick={() => onNavigate(action.view)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-semibold tracking-wide">{action.title.toUpperCase()}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Elite Handstand Training Protocol */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-foreground tactical-font tracking-wide">HANDSTAND INTEL</h2>
        <Card className="bg-card border border-warning">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-lg">🎯</div>
              <h3 className="font-bold text-warning tactical-font tracking-wide text-sm">PRECISION DRILLS</h3>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="uppercase tracking-wider text-xs">REFERENCE POINT TRAINING:</p>
              <div className="grid grid-cols-1 gap-1 ml-2">
                <span>• Box Supported Tuck Extensions</span>
                <span>• Stomach to Wall Knee Slides</span>
                <span>• Back to Wall Leg Extensions</span>
                <span>• Side Wall Handstand Hold</span>
                <span>• Dual Prone Parallette Hold</span>
              </div>
              <p className="mt-2 italic text-xs">"TOE TAP TO FLOAT builds balance, control, and body awareness"</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mission Brief */}
      <Card className="bg-card border border-primary">
        <CardContent className="p-3 text-center">
          <div className="text-2xl mb-1">⚔️</div>
          <h3 className="font-bold text-primary mb-1 tactical-font tracking-wide text-sm">MISSION BRIEF</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            "DISCIPLINE BUILDS WARRIORS"
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDashboard;