
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
      id: "v2.1.0",
      version: "2.1.0",
      date: new Date("2025-01-28"),
      title: "Clean Design & Enhanced Exercise Details",
      description: "Complete UI redesign with white/black theme, detailed muscle anatomy, tendon involvement, and recovery times for each exercise",
      type: "feature"
    },
    {
      id: "v2.0.0",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Major CALIXTLC Transformation",
      description: "Complete app overhaul with advanced calisthenics database, video integration, and comprehensive features",
      type: "feature"
    },
    {
      id: "exercise-anatomy",
      version: "2.1.0",
      date: new Date("2025-01-28"),
      title: "Detailed Exercise Anatomy",
      description: "Added comprehensive muscle groups, tendon involvement, and specific recovery times for optimal training planning",
      type: "feature"
    },
    {
      id: "clean-design",
      version: "2.1.0",
      date: new Date("2025-01-28"),
      title: "Clean White/Black Design System",
      description: "Professional design overhaul with clean white backgrounds, black outlines, and premium shadows throughout",
      type: "improvement"
    },
    {
      id: "exercise-db",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Advanced Exercise Database",
      description: "Added 30+ elite calisthenics moves including advanced progressions and flow combinations",
      type: "feature"
    },
    {
      id: "video-integration",
      version: "2.0.0", 
      date: new Date("2025-01-28"),
      title: "YouTube Video Player Integration",
      description: "Embedded video tutorials for every exercise with series support and progress tracking",
      type: "feature"
    },
    {
      id: "weather-location",
      version: "2.0.0",
      date: new Date("2025-01-28"), 
      title: "Weather & Location Services",
      description: "Real-time weather conditions, workout suitability recommendations, and GPS location detection",
      type: "feature"
    },
    {
      id: "achievement-system",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Achievement System", 
      description: "Motivational achievement system with daily completion tracking and streak counters",
      type: "feature"
    },
    {
      id: "mobility-yoga",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Yoga & Mobility Integration",
      description: "Complete yoga flow sequences, mobility exercises, and flexibility progression tracking",
      type: "feature"
    },
    {
      id: "swimming-cardio",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Swimming & Cardio Tracking",
      description: "Swimming lap counter, cardio workout library, and cross-training metrics",
      type: "feature"
    },
    {
      id: "compact-ui",
      version: "2.0.0", 
      date: new Date("2025-01-28"),
      title: "Compact UI & Better Navigation",
      description: "Redesigned interface with tabbed navigation, collapsible sections, and optimized mobile experience",
      type: "improvement"
    },
    {
      id: "architecture-polish",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Architecture & Code Quality", 
      description: "Enhanced TypeScript definitions, improved state management, and better component organization",
      type: "improvement"
    }
  ];

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Star className="h-4 w-4 text-success" />;
      case 'improvement':
        return <Zap className="h-4 w-4 text-info" />;
      case 'bugfix':
        return <Bug className="h-4 w-4 text-destructive" />;
      default:
        return <Wrench className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-success text-success-foreground';
      case 'improvement': 
        return 'bg-info text-info-foreground';
      case 'bugfix':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="p-3 space-y-4 mobile-safe-area">
      {/* Header */}
      <div className="text-center space-y-1 py-3">
        <div className="text-2xl font-black text-primary tracking-wider">
          UPDATE LOG
        </div>
        <div className="text-xs font-medium text-muted-foreground tracking-wide">
          [ SYSTEM UPDATES & IMPROVEMENTS ]
        </div>
      </div>

      {/* Version Summary */}
      <Card className="bg-card border border-primary">
        <CardContent className="p-3">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <div>
              <h3 className="font-bold text-sm">CURRENT VERSION: 2.1.0</h3>
              <p className="text-xs text-muted-foreground">Released: January 28, 2025</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Enhanced design with detailed exercise anatomy, muscle groups, tendon involvement, 
            and recovery time tracking for optimal training.
          </p>
        </CardContent>
      </Card>

      {/* Updates List */}
      <Card className="bg-card border border-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">RECENT UPDATES</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {updates.map((update) => (
                <div 
                  key={update.id}
                  className="border border-muted rounded-lg p-3 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {getUpdateIcon(update.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{update.title}</h4>
                        <Badge className={`text-xs ${getBadgeColor(update.type)}`}>
                          {update.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {update.description}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(update.date)}</span>
                        <span>•</span>
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="bg-card border border-success">
          <CardContent className="p-2 text-center">
            <div className="text-lg font-bold text-success">9</div>
            <div className="text-xs text-muted-foreground">NEW FEATURES</div>
          </CardContent>
        </Card>
        <Card className="bg-card border border-info">
          <CardContent className="p-2 text-center">
            <div className="text-lg font-bold text-info">4</div>
            <div className="text-xs text-muted-foreground">IMPROVEMENTS</div>
          </CardContent>
        </Card>
        <Card className="bg-card border border-primary">
          <CardContent className="p-2 text-center">
            <div className="text-lg font-bold text-primary">30+</div>
            <div className="text-xs text-muted-foreground">NEW EXERCISES</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatesTab;
