import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { AppUpdate } from "@/types";
import { 
  Zap, 
  Wrench, 
  Bug, 
  Calendar,
  CheckCircle,
  Star
} from "lucide-react";

const UpdatesTab = () => {
  const updates: AppUpdate[] = [
    {
      id: "v4.0.0",
      version: "4.0.0",
      date: new Date("2026-03-07"),
      title: "Tender Loving Care — Complete Rebrand",
      description: "Full platform rebrand combining the best of our exercise library, training system, and coaching features into one unified experience. Removed all third-party platform dependencies.",
      type: "feature"
    },
    {
      id: "v3.0.0",
      version: "3.0.0",
      date: new Date("2026-03-02"),
      title: "Tender Loving Care v3.0",
      description: "Complete transformation to brutalist design system, STACKED training cycle, Learn Mode with motor-learning research, Integrity blocks, and skill path navigation.",
      type: "feature"
    },
    {
      id: "learn-mode",
      version: "3.0.0",
      date: new Date("2026-03-02"),
      title: "Learn Mode Integration",
      description: "Research-backed coaching layer with 8 motor-learning principles, learn cards, and post-workout learn bites.",
      type: "feature"
    },
    {
      id: "stacked-cycle",
      version: "3.0.0",
      date: new Date("2026-03-02"),
      title: "STACKED Training Cycle",
      description: "4-day auto-rotating training cycle: Leverage, Pull+Grip, Inversions, Legs+Mobility — plus optional skill play.",
      type: "feature"
    },
    {
      id: "integrity-blocks",
      version: "3.0.0",
      date: new Date("2026-03-02"),
      title: "Integrity Blocks",
      description: "Standalone mobility and yoga sequences: wrist prep, thoracic mobility, hip opening, pancake progression, ankle work.",
      type: "feature"
    },
    {
      id: "brutalist-design",
      version: "3.0.0",
      date: new Date("2026-03-02"),
      title: "Brutalist Design System",
      description: "Clean newspaper typography, 3px ink borders, 24px radius, and flat premium shadows throughout.",
      type: "improvement"
    },
    {
      id: "non-negotiables",
      version: "3.0.0",
      date: new Date("2026-03-02"),
      title: "Global Non-Negotiables",
      description: "Ribs Down, Glutes 30%, Shoulders Tall, Active Legs — persistent coaching cues on every screen.",
      type: "feature"
    },
  ];

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'feature': return <Star className="h-4 w-4 text-primary" />;
      case 'improvement': return <Zap className="h-4 w-4 text-muted-foreground" />;
      case 'bugfix': return <Bug className="h-4 w-4 text-destructive" />;
      default: return <Wrench className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4 space-y-2">
        <h1 className="font-serif text-3xl font-black text-foreground tracking-tight">
          Updates
        </h1>
        <p className="text-sm text-muted-foreground">System changelog</p>
      </div>

      <Card className="border-[3px] border-foreground rounded-[24px]">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="font-serif text-sm font-bold">CURRENT: v4.0.0</CardTitle>
              <p className="text-xs text-muted-foreground">March 7, 2026</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-[3px] border-foreground rounded-[24px]">
        <CardContent className="p-4">
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {updates.map((update) => (
                <div 
                  key={update.id}
                  className="border-[2px] border-border rounded-[16px] p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getUpdateIcon(update.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-foreground">{update.title}</h4>
                        <Badge variant="outline" className="text-[10px] border-foreground/30 rounded-full">
                          {update.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {update.description}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(update.date)}</span>
                        <span>·</span>
                        <span>v{update.version}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatesTab;
