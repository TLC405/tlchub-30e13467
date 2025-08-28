import { useState } from "react";
import type { ViewType } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Dumbbell, 
  TrendingUp, 
  BookOpen, 
  Timer,
  Trophy,
  Calendar
} from "lucide-react";

// Mobile Components
import MobileDashboard from "@/components/MobileDashboard";
import MobileTimer from "@/components/MobileTimer";
import TrainingView from "@/components/TrainingView";
import ProgressView from "@/components/ProgressView";
import ExerciseLibrary from "@/components/ExerciseLibrary";
import FoundationProgram from "@/components/FoundationProgram";
import AdvancedWorkouts from "@/components/AdvancedWorkouts";
import SkillMastery from "@/components/SkillMastery";
import DisciplineLibrary from "@/components/DisciplineLibrary";
import WeeklyPlan from "@/components/WeeklyPlan";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const tabs = [
    { id: 'dashboard' as ViewType, label: 'Home', icon: LayoutDashboard, color: 'text-primary' },
    { id: 'plan' as ViewType, label: 'Plan', icon: Calendar, color: 'text-accent' },
    { id: 'timer' as ViewType, label: 'Timer', icon: Timer, color: 'text-secondary' },
    { id: 'discipline' as ViewType, label: 'Library', icon: BookOpen, color: 'text-warning' },
    { id: 'skills' as ViewType, label: 'Skills', icon: Trophy, color: 'text-success' },
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
      case 'skills':
        return <SkillMastery />;
      case 'discipline':
        return <DisciplineLibrary />;
      case 'plan':
        return <WeeklyPlan />;
      default:
        return <MobileDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="pb-20 overflow-auto">
        {renderView()}
      </main>

      {/* Mobile Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border mobile-safe-area">
        <div className="grid grid-cols-5 px-1 py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={`flex-col h-12 space-y-1 transition-all duration-300 ${
                  isActive 
                    ? `${tab.color} bg-primary/20 border border-primary` 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/20'
                }`}
                onClick={() => setCurrentView(tab.id)}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'scale-110' : ''} transition-transform duration-300`} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {tab.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;