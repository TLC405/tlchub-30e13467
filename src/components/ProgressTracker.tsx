import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  Plus,
  Edit3,
  BarChart3
} from "lucide-react";

interface ProgressEntry {
  id: string;
  date: string;
  exercise: string;
  category: string;
  value: number;
  unit: string;
  notes?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedDate?: string;
  icon: React.ReactNode;
}

const initialProgress: ProgressEntry[] = [
  {
    id: "1",
    date: "2024-01-15",
    exercise: "Handstand Hold",
    category: "handstand",
    value: 25,
    unit: "seconds",
    notes: "Getting more stable!"
  },
  {
    id: "2",
    date: "2024-01-10",
    exercise: "Handstand Hold",
    category: "handstand",
    value: 20,
    unit: "seconds"
  },
  {
    id: "3",
    date: "2024-01-12",
    exercise: "Pull-ups",
    category: "pullup",
    value: 8,
    unit: "reps",
    notes: "New PR!"
  },
  {
    id: "4",
    date: "2024-01-08",
    exercise: "Tuck Planche",
    category: "planche",
    value: 12,
    unit: "seconds"
  },
  {
    id: "5",
    date: "2024-01-14",
    exercise: "Ring Support",
    category: "rings",
    value: 30,
    unit: "seconds"
  }
];

const achievements: Achievement[] = [
  {
    id: "first-handstand",
    title: "First Handstand",
    description: "Hold a handstand for 10 seconds",
    unlocked: true,
    unlockedDate: "2024-01-08",
    icon: <Award className="h-4 w-4" />
  },
  {
    id: "pullup-master",
    title: "Pull-up Master",
    description: "Complete 10 pull-ups in a row",
    unlocked: false,
    icon: <TrendingUp className="h-4 w-4" />
  },
  {
    id: "planche-progression",
    title: "Planche Progression",
    description: "Hold tuck planche for 15 seconds",
    unlocked: false,
    icon: <Target className="h-4 w-4" />
  },
  {
    id: "ring-warrior",
    title: "Ring Warrior",
    description: "Complete first ring muscle-up",
    unlocked: false,
    icon: <Award className="h-4 w-4" />
  }
];

const ProgressTracker = () => {
  const [progressData, setProgressData] = useState(initialProgress);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddProgress = () => {
    toast({
      title: "Add Progress Entry",
      description: "Progress tracking feature coming soon!",
    });
  };

  const getRecentProgress = () => {
    return progressData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const getCategoryProgress = (category: string) => {
    return progressData
      .filter(entry => entry.category === category)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getProgressStats = () => {
    const categories = ["handstand", "planche", "pullup", "rings"];
    return categories.map(category => {
      const entries = getCategoryProgress(category);
      const latest = entries[0];
      const previous = entries[1];
      
      let trend = 0;
      if (latest && previous) {
        trend = ((latest.value - previous.value) / previous.value) * 100;
      }
      
      return {
        category,
        latest: latest?.value || 0,
        unit: latest?.unit || "",
        trend,
        entries: entries.length
      };
    });
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalAchievements = achievements.length;
  const achievementProgress = (unlockedAchievements.length / totalAchievements) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="glass-card leather-texture border-2 border-card-border premium-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 primary-gradient rounded-lg flex items-center justify-center gold-shadow">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl text-card-foreground">Progress Tracker</CardTitle>
                <p className="text-sm text-muted-foreground">Track your calisthenics journey</p>
              </div>
            </div>
            <Button
              onClick={handleAddProgress}
              className="primary-gradient hover:opacity-90 text-primary-foreground gold-shadow"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Category Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getProgressStats().map((stat) => (
              <div 
                key={stat.category}
                className={`p-4 rounded-xl border-2 ${stat.category}-theme transition-all duration-300 hover:scale-105 cursor-pointer`}
                onClick={() => setSelectedCategory(selectedCategory === stat.category ? null : stat.category)}
              >
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium text-card-foreground capitalize">
                    {stat.category}
                  </div>
                  <div className="text-2xl font-bold text-card-foreground">
                    {stat.latest}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.unit} • {stat.entries} entries
                  </div>
                  {stat.trend !== 0 && (
                    <Badge 
                      variant={stat.trend > 0 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {stat.trend > 0 ? "+" : ""}{stat.trend.toFixed(1)}%
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Progress */}
          {!selectedCategory && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Recent Progress</h3>
              <div className="space-y-3">
                {getRecentProgress().map((entry) => (
                  <div 
                    key={entry.id}
                    className="flex items-center justify-between p-3 bg-background-secondary/50 rounded-lg border border-card-border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`h-2 w-2 ${entry.category}-gradient rounded-full gold-shadow`} />
                      <div>
                        <p className="font-medium text-card-foreground">{entry.exercise}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-card-foreground">
                        {entry.value} {entry.unit}
                      </div>
                      {entry.notes && (
                        <p className="text-xs text-muted-foreground">{entry.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Detailed View */}
          {selectedCategory && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground capitalize">
                  {selectedCategory} Progress
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Back to Overview
                </Button>
              </div>
              <div className="space-y-3">
                {getCategoryProgress(selectedCategory).map((entry) => (
                  <div 
                    key={entry.id}
                    className={`p-4 rounded-xl border-2 ${entry.category}-theme`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-card-foreground">{entry.exercise}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                        {entry.notes && (
                          <p className="text-xs text-muted-foreground mt-1">{entry.notes}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-card-foreground">
                          {entry.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{entry.unit}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="glass-card leather-texture border-2 border-card-border premium-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 primary-gradient rounded-lg flex items-center justify-center gold-shadow">
                <Award className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl text-card-foreground">Achievements</CardTitle>
                <p className="text-sm text-muted-foreground">Unlock milestones in your journey</p>
              </div>
            </div>
            <Badge className="bronze-gradient text-primary-foreground">
              {unlockedAchievements.length}/{totalAchievements}
            </Badge>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Achievement Progress</span>
              <span>{Math.round(achievementProgress)}%</span>
            </div>
            <Progress value={achievementProgress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'glass-card border-gold/30 gold-shadow' 
                    : 'bg-background-secondary/30 border-border opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    achievement.unlocked ? 'bronze-gradient gold-shadow' : 'bg-muted'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.unlocked && achievement.unlockedDate && (
                      <p className="text-xs text-gold mt-1">
                        Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;