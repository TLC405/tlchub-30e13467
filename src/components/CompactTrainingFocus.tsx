
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target } from "lucide-react";
import type { ViewType } from "@/types";

interface CompactTrainingFocusProps {
  onNavigate: (view: ViewType) => void;
}

const CompactTrainingFocus = ({ onNavigate }: CompactTrainingFocusProps) => {
  const focusAreas = [
    {
      id: "handstand",
      title: "Handstand Dev",
      emoji: "🤸",
      progress: 35,
      current: "Wall Hold 20s",
      level: "BEGINNER"
    },
    {
      id: "pullup",
      title: "Pull-up Power",
      emoji: "💪",
      progress: 65,
      current: "10 Reps Max",
      level: "INTERMEDIATE"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-card to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Training Focus
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('enhanced-library')}
            className="text-xs hover:bg-primary/10"
          >
            View All <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>

        <div className="space-y-3">
          {focusAreas.map((area) => (
            <div
              key={area.id}
              className="p-3 bg-gradient-to-r from-background/50 to-primary/5 rounded-lg border border-primary/10 cursor-pointer hover:border-primary/30 transition-all duration-200"
              onClick={() => onNavigate('enhanced-library')}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg">{area.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground truncate">
                      {area.title}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {area.level}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {area.current}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {area.progress}%
                  </div>
                </div>
              </div>
              <Progress value={area.progress} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactTrainingFocus;
