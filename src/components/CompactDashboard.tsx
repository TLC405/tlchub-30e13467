
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CompactStats from "./CompactStats";
import CompactTrainingFocus from "./CompactTrainingFocus";
import CompactQuickActions from "./CompactQuickActions";
import DetailedWeatherWidget from "./DetailedWeatherWidget";
import { 
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  ChevronRight
} from "lucide-react";

interface CompactDashboardProps {
  onNavigate: (view: string) => void;
}

export function CompactDashboard({ onNavigate }: CompactDashboardProps) {
  return (
    <div className="space-y-6 max-w-full">
      {/* Welcome Section */}
      <div className="text-center space-y-2 py-4">
        <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
        <p className="text-muted-foreground">Ready to push your limits today?</p>
      </div>

      {/* Top Row - Weather & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DetailedWeatherWidget />
        <CompactStats />
      </div>

      {/* Middle Row - Training Focus */}
      <CompactTrainingFocus onNavigate={onNavigate} />

      {/* Bottom Row - Quick Actions & Today's Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompactQuickActions onNavigate={onNavigate} />
        
        {/* Today's Plan */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Plan
              </CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                3 exercises
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="font-medium">Handstand Practice</span>
                </div>
                <span className="text-sm text-muted-foreground">15 min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-orange-500 rounded-full" />
                  <span className="font-medium">Pull-up Progression</span>
                </div>
                <span className="text-sm text-muted-foreground">20 min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <span className="font-medium">Core Strengthening</span>
                </div>
                <span className="text-sm text-muted-foreground">10 min</span>
              </div>
            </div>
            <Button 
              onClick={() => onNavigate("training")}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Start Today's Workout
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Highlights */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-600" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">7</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">New PRs</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">85%</div>
              <div className="text-sm text-muted-foreground">Goal Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
