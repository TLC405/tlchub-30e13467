
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Achievement, WorkoutSession } from "@/types";
import { 
  Heart, 
  Trophy, 
  Target, 
  Flame, 
  Star, 
  Award,
  Zap
} from "lucide-react";

interface AchievementSystemProps {
  onWorkoutComplete?: () => void;
}

const AchievementSystem = ({ onWorkoutComplete }: AchievementSystemProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [dailyComplete, setDailyComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadAchievements();
    loadDailyProgress();
  }, []);

  const loadAchievements = () => {
    const defaultAchievements: Achievement[] = [
      {
        id: "first-workout",
        title: "First Mission Complete",
        description: "Complete your first workout",
        icon: "🎯",
        earned: false
      },
      {
        id: "week-streak",
        title: "Week Warrior", 
        description: "Complete 7 days in a row",
        icon: "🔥",
        earned: false
      },
      {
        id: "handstand-master",
        title: "Handstand Master",
        description: "Hold handstand for 30 seconds",
        icon: "🤸",
        earned: false
      },
      {
        id: "pullup-pro",
        title: "Pull-up Pro",
        description: "Complete 10 pull-ups in a row",
        icon: "💪",
        earned: false
      },
      {
        id: "planche-power",
        title: "Planche Power",
        description: "Hold tuck planche for 15 seconds", 
        icon: "⚡",
        earned: false
      }
    ];

    setAchievements(defaultAchievements);
  };

  const loadDailyProgress = () => {
    const today = new Date().toDateString();
    const completedToday = localStorage.getItem(`workout-${today}`) === 'true';
    setDailyComplete(completedToday);
    
    const storedStreak = parseInt(localStorage.getItem('workout-streak') || '0');
    setStreak(storedStreak);
  };

  const completeWorkout = () => {
    const today = new Date().toDateString();
    
    if (!dailyComplete) {
      // Mark today as complete
      localStorage.setItem(`workout-${today}`, 'true');
      setDailyComplete(true);
      
      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('workout-streak', newStreak.toString());
      
      // Show celebration
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
      
      // Check for achievements
      checkAchievements(newStreak);
      
      if (onWorkoutComplete) {
        onWorkoutComplete();
      }
    }
  };

  const checkAchievements = (currentStreak: number) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === "first-workout" && !achievement.earned) {
        return { ...achievement, earned: true, earnedDate: new Date() };
      }
      if (achievement.id === "week-streak" && currentStreak >= 7 && !achievement.earned) {
        return { ...achievement, earned: true, earnedDate: new Date() };
      }
      return achievement;
    }));
  };

  const resetStreak = () => {
    setStreak(0);
    setDailyComplete(false);
    localStorage.removeItem('workout-streak');
    const today = new Date().toDateString();
    localStorage.removeItem(`workout-${today}`);
  };

  return (
    <div className="space-y-3">
      {/* Big Red Heart Celebration */}
      {showCelebration && (
        <Card className="bg-gradient-to-r from-red-500 to-pink-500 border-2 border-red-400 animate-pulse">
          <CardContent className="p-4 text-center">
            <div className="text-6xl mb-2">❤️</div>
            <h3 className="text-white font-bold tactical-font text-lg">
              MISSION ACCOMPLISHED!
            </h3>
            <p className="text-red-100 text-sm">Outstanding work, warrior! 🎯</p>
          </CardContent>
        </Card>
      )}

      {/* Daily Progress */}
      <Card className="bg-card border border-primary">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold tactical-font text-sm">TODAY'S MISSION</h3>
            <Badge className={dailyComplete ? "bg-green-500" : "bg-yellow-500"}>
              {dailyComplete ? "COMPLETE" : "PENDING"}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3 mb-3">
            <div className="text-2xl">
              {dailyComplete ? "❤️" : "🎯"}
            </div>
            <div>
              <p className="text-sm font-medium">
                {dailyComplete ? "Mission Complete!" : "Ready for Action"}
              </p>
              <p className="text-xs text-muted-foreground">
                Current Streak: {streak} days 🔥
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {!dailyComplete && (
              <Button 
                onClick={completeWorkout}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white tactical-font text-sm"
              >
                <Heart className="h-4 w-4 mr-1" />
                COMPLETE MISSION
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetStreak}
              className="text-xs"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-card border border-primary">
        <CardContent className="p-3">
          <h3 className="font-semibold tactical-font text-sm mb-2">ACHIEVEMENTS</h3>
          <div className="space-y-2">
            {achievements.slice(0, 3).map((achievement) => (
              <div 
                key={achievement.id}
                className={`flex items-center space-x-2 p-2 rounded ${
                  achievement.earned ? 'bg-green-500/20 border border-green-500' : 'bg-muted/20'
                }`}
              >
                <div className="text-lg">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="text-xs font-medium">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <Trophy className="h-3 w-3 text-yellow-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementSystem;
