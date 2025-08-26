import { useState } from "react";
import type { ViewType } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Dumbbell, 
  TrendingUp, 
  BookOpen, 
  Timer,
  GraduationCap
} from "lucide-react";

// Mobile Components
import MobileDashboard from "@/components/MobileDashboard";
import MobileTimer from "@/components/MobileTimer";
import TrainingView from "@/components/TrainingView";
import ProgressView from "@/components/ProgressView";
import ExerciseLibrary from "@/components/ExerciseLibrary";
import FoundationProgram from "@/components/FoundationProgram";
import AdvancedWorkouts from "@/components/AdvancedWorkouts";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const tabs = [
    { id: 'dashboard' as ViewType, label: 'Home', icon: LayoutDashboard, color: 'text-primary' },
    { id: 'training' as ViewType, label: 'Train', icon: Dumbbell, color: 'text-accent' },
    { id: 'timer' as ViewType, label: 'Timer', icon: Timer, color: 'text-secondary' },
    { id: 'foundation' as ViewType, label: 'Program', icon: GraduationCap, color: 'text-warning' },
    { id: 'library' as ViewType, label: 'Library', icon: BookOpen, color: 'text-success' },
    { id: 'progress' as ViewType, label: 'Stats', icon: TrendingUp, color: 'text-destructive' },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <MobileDashboard onNavigate={setCurrentView} />;
      case 'training':
        return <TrainingView />;
      case 'timer':
        return <MobileTimer />;
      case 'foundation':
        return <FoundationProgram />;
      case 'library':
        return <ExerciseLibrary />;
      case 'progress':
        return <ProgressView />;
      default:
        return <MobileDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
      {/* Main Content */}
      <main className="pb-20 overflow-auto">
        {renderView()}
      </main>

      {/* Mobile Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border mobile-safe-area">
        <div className="grid grid-cols-6 px-1 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={`flex-col h-16 space-y-1 transition-all duration-300 tab-animate ${
                  isActive 
                    ? `${tab.color} bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl vibrant-shadow` 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setCurrentView(tab.id)}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform duration-300`} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-current rounded-full" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;