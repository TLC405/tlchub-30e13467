
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
      id: "v2.0.0",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Major CalX TLC Transformation",
      description: "Complete app overhaul with advanced calisthenics database, AI image generation, and comprehensive features",
      type: "feature"
    },
    {
      id: "exercise-db",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Advanced Exercise Database",
      description: "Added 30+ elite calisthenics moves including Typewriter Pull-ups, Ring Skin the Cat, Human Flag, Dragon Flag, and complex flow combinations",
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
      description: "Real-time weather conditions, workout suitability recommendations, GPS location detection, and OKC Vasa gym integration",
      type: "feature"
    },
    {
      id: "achievement-system",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Big Red Heart Achievement System", 
      description: "Motivational achievement system with daily completion tracking, streak counters, and celebration animations",
      type: "feature"
    },
    {
      id: "mobility-yoga",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Yoga & Olympic Mobility Integration",
      description: "Complete yoga flow sequences, Olympic mobility exercises, morning/evening routines, and flexibility progression tracking",
      type: "feature"
    },
    {
      id: "swimming-cardio",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Swimming & Cardio Tracking",
      description: "Swimming lap counter, Vasa trainer integration for OKC, cardio workout library, and cross-training metrics",
      type: "feature"
    },
    {
      id: "ai-image-generation",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "AI Exercise Image Generation",
      description: "Automatic workout image generation for exercise cards, background removal, and smart prompt system",
      type: "feature"
    },
    {
      id: "compact-ui",
      version: "2.0.0", 
      date: new Date("2025-01-28"),
      title: "Compact UI & Reduced Scrolling",
      description: "Redesigned interface with tabbed navigation, collapsible sections, optimized card sizes, and better mobile experience",
      type: "improvement"
    },
    {
      id: "architecture-polish",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Architecture & Code Polish", 
      description: "Enhanced TypeScript definitions, improved state management, performance optimizations, and better component organization",
      type: "improvement"
    },
    {
      id: "progression-system",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Elite Progression System",
      description: "Skill tree progression from beginner to elite levels, prerequisite tracking, and flow combination mastery paths",
      type: "feature"
    },
    {
      id: "data-persistence",
      version: "2.0.0",
      date: new Date("2025-01-28"),
      title: "Local Data Persistence",
      description: "Workout progress, achievements, and user preferences now saved locally with backup/restore capabilities", 
      type: "improvement"
    }
  ];

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Star className="h-4 w-4 text-green-500" />;
      case 'improvement':
        return <Zap className="h-4 w-4 text-blue-500" />;
      case 'bugfix':
        return <Bug className="h-4 w-4 text-red-500" />;
      default:
        return <Wrench className="h-4 w-4 text-gray-500" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-green-500';
      case 'improvement': 
        return 'bg-blue-500';
      case 'bugfix':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
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
        <div className="tactical-font text-2xl font-black text-primary tracking-wider">
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
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <h3 className="font-bold tactical-font text-sm">CURRENT VERSION: 2.0.0</h3>
              <p className="text-xs text-muted-foreground">Released: January 28, 2025</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Major transformation with 12 new features, advanced exercise database, 
            and comprehensive calisthenics mastery system.
          </p>
        </CardContent>
      </Card>

      {/* Updates List */}
      <Card className="bg-card border border-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm tactical-font">RECENT UPDATES</CardTitle>
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
                        <h4 className="font-semibold text-sm tactical-font">{update.title}</h4>
                        <Badge 
                          className={`text-xs text-white ${getBadgeColor(update.type)}`}
                        >
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
        <Card className="bg-card border border-green-500">
          <CardContent className="p-2 text-center">
            <div className="text-lg font-bold tactical-font text-green-500">8</div>
            <div className="text-xs text-muted-foreground">NEW FEATURES</div>
          </CardContent>
        </Card>
        <Card className="bg-card border border-blue-500">
          <CardContent className="p-2 text-center">
            <div className="text-lg font-bold tactical-font text-blue-500">4</div>
            <div className="text-xs text-muted-foreground">IMPROVEMENTS</div>
          </CardContent>
        </Card>
        <Card className="bg-card border border-primary">
          <CardContent className="p-2 text-center">
            <div className="text-lg font-bold tactical-font text-primary">30+</div>
            <div className="text-xs text-muted-foreground">NEW EXERCISES</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatesTab;
