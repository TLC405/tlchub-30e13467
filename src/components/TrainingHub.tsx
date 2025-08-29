
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { ViewType } from "@/types";
import {
  Target,
  Trophy,
  BookOpen,
  Timer,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Activity,
  Brain,
  Zap,
  Heart,
  Users,
  Calendar,
  BarChart3
} from "lucide-react";

interface TrainingHubProps {
  onNavigate: (view: ViewType) => void;
}

interface WorkoutLog {
  id: string;
  exercise: string;
  category: string;
  reps?: number;
  duration?: number;
  notes: string;
  date: string;
  musclesWorked: string[];
  recoveryTime: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  progress: number;
  target: number;
  category: string;
  icon: string;
}

const TrainingHub = ({ onNavigate }: TrainingHubProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [weeklyGoal, setWeeklyGoal] = useState(4);
  const [completedWorkouts, setCompletedWorkouts] = useState(1);
  const [currentStreak, setCurrentStreak] = useState(3);

  const recentWorkouts: WorkoutLog[] = [
    {
      id: "1",
      exercise: "Handstand Practice",
      category: "balance",
      duration: 15,
      notes: "Improved wall hold time",
      date: "2024-01-15",
      musclesWorked: ["Shoulders", "Core", "Wrists"],
      recoveryTime: "24-48 hours"
    },
    {
      id: "2", 
      exercise: "Pull-up Progression",
      category: "strength",
      reps: 8,
      notes: "New personal record",
      date: "2024-01-14",
      musclesWorked: ["Lats", "Biceps", "Rhomboids"],
      recoveryTime: "36-48 hours"
    }
  ];

  const achievements: Achievement[] = [
    {
      id: "first-week",
      title: "First Week Complete",
      description: "Complete 4 workouts in your first week",
      earned: false,
      progress: 1,
      target: 4,
      category: "consistency",
      icon: "🎯"
    },
    {
      id: "handstand-hold",
      title: "Handstand Master",
      description: "Hold handstand for 30 seconds",
      earned: false,
      progress: 15,
      target: 30,
      category: "skill",
      icon: "🤸"
    },
    {
      id: "pullup-power",
      title: "Pull-up Power",
      description: "Complete 10 consecutive pull-ups",
      earned: false,
      progress: 8,
      target: 10,
      category: "strength",
      icon: "💪"
    }
  ];

  const aiInsights = [
    {
      type: "recovery",
      message: "Your shoulders need 24-48 hours recovery after yesterday's handstand work. Consider mobility exercises today.",
      priority: "high"
    },
    {
      type: "progression",
      message: "You're ready to progress from wall handstands to freestanding attempts. Start with 5-second holds.",
      priority: "medium"
    },
    {
      type: "nutrition",
      message: "Post-workout protein within 30 minutes will optimize muscle recovery and growth.",
      priority: "low"
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="p-4 space-y-4 bg-background">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Training Hub
        </h1>
        <p className="text-sm text-muted-foreground">
          Your complete calisthenics training ecosystem
        </p>
      </div>

      {/* AI Coaching Section */}
      <Card className="bg-card border border-primary">
        <Collapsible>
          <CollapsibleTrigger 
            className="w-full"
            onClick={() => toggleSection('ai')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">AI Coach</h3>
                    <p className="text-xs text-muted-foreground">Personalized guidance & insights</p>
                  </div>
                </div>
                {expandedSection === 'ai' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardContent>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="px-4 pb-4 pt-0">
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      insight.priority === 'high' 
                        ? 'bg-red-50 border-l-red-500' 
                        : insight.priority === 'medium'
                        ? 'bg-yellow-50 border-l-yellow-500'
                        : 'bg-blue-50 border-l-blue-500'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                      </Badge>
                      <Badge 
                        variant={insight.priority === 'high' ? 'destructive' : insight.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">{insight.message}</p>
                  </div>
                ))}
                <Button 
                  className="w-full mt-3"
                  variant="outline"
                  onClick={() => onNavigate('ai')}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Open AI Coach
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-card border border-accent">
          <CardContent className="p-3 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-accent" />
            <div className="text-lg font-bold text-foreground">{completedWorkouts}/{weeklyGoal}</div>
            <p className="text-xs text-muted-foreground">Week Progress</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border border-primary">
          <CardContent className="p-3 text-center">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold text-foreground">{achievements.filter(a => a.earned).length}/{achievements.length}</div>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border border-warning">
          <CardContent className="p-3 text-center">
            <Zap className="h-6 w-6 mx-auto mb-2 text-warning" />
            <div className="text-lg font-bold text-foreground">{currentStreak}</div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Workouts */}
      <Card className="bg-card border border-border">
        <Collapsible>
          <CollapsibleTrigger 
            className="w-full"
            onClick={() => toggleSection('workouts')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Recent Workouts</h3>
                </div>
                {expandedSection === 'workouts' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardContent>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="px-4 pb-4 pt-0">
              <ScrollArea className="h-48">
                <div className="space-y-3">
                  {recentWorkouts.map((workout) => (
                    <div key={workout.id} className="p-3 bg-background rounded-lg border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-foreground">{workout.exercise}</h4>
                        <Badge variant="outline" className="text-xs">
                          {new Date(workout.date).toLocaleDateString()}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{workout.notes}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {workout.musclesWorked.map((muscle) => (
                          <Badge key={muscle} variant="secondary" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Recovery: {workout.recoveryTime}</span>
                        {workout.reps && <span>{workout.reps} reps</span>}
                        {workout.duration && <span>{workout.duration}s</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Achievements */}
      <Card className="bg-card border border-border">
        <Collapsible>
          <CollapsibleTrigger 
            className="w-full"
            onClick={() => toggleSection('achievements')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trophy className="h-5 w-5 text-warning" />
                  <h3 className="font-semibold text-foreground">Achievements</h3>
                </div>
                {expandedSection === 'achievements' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardContent>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="px-4 pb-4 pt-0">
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-3 rounded-lg border ${
                      achievement.earned 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-background border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{achievement.icon}</span>
                        <h4 className="font-medium text-foreground">{achievement.title}</h4>
                      </div>
                      {achievement.earned && <Trophy className="h-4 w-4 text-yellow-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.target}</span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.target) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          className="h-16 flex-col space-y-2"
          variant="outline"
          onClick={() => onNavigate('enhanced-library')}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-sm">Exercise Library</span>
        </Button>
        <Button
          className="h-16 flex-col space-y-2"
          onClick={() => onNavigate('timer')}
        >
          <Timer className="h-5 w-5" />
          <span className="text-sm">Start Workout</span>
        </Button>
      </div>
    </div>
  );
};

export default TrainingHub;
