
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Calendar, TrendingUp } from "lucide-react";

const CompactStats = () => {
  const stats = {
    weekStreak: 3,
    totalWorkouts: 12,
    thisWeek: { completed: 1, total: 4 },
    weeklyProgress: 25
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="bg-gradient-to-br from-card to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl font-bold text-foreground font-mono">
                {stats.weekStreak}
              </div>
              <div className="text-xs text-muted-foreground font-medium truncate">
                Day Streak
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-accent/5 border border-accent/20 hover:border-accent/40 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Trophy className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl font-bold text-foreground font-mono">
                {stats.totalWorkouts}
              </div>
              <div className="text-xs text-muted-foreground font-medium truncate">
                Sessions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2 bg-gradient-to-br from-card to-secondary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Weekly Progress</span>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
              {stats.thisWeek.completed}/{stats.thisWeek.total}
            </Badge>
          </div>
          <Progress value={stats.weeklyProgress} className="h-2" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <span>On track for weekly goal</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactStats;
