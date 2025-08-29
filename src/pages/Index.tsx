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
  Calendar,
  Brain
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
import FileManager from "@/components/FileManager";
import AIAssistant from "@/components/AIAssistant";
import EnhancedExerciseLibrary from "@/components/EnhancedExerciseLibrary";
import CompactExerciseLibrary from "@/components/CompactExerciseLibrary";
import UpdatesTab from "@/components/UpdatesTab";
import AgentTLC from "@/components/AgentTLC";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const tabs = [
    { id: 'dashboard' as ViewType, label: 'Home', icon: LayoutDashboard, color: 'text-primary' },
    { id: 'enhanced-library' as ViewType, label: 'Library', icon: BookOpen, color: 'text-accent' },
    { id: 'agent' as ViewType, label: 'Agent', icon: Brain, color: 'text-secondary' },
    { id: 'plan' as ViewType, label: 'Plan', icon: Calendar, color: 'text-warning' },
    { id: 'updates' as ViewType, label: 'Updates', icon: Trophy, color: 'text-success' },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <MobileDashboard onNavigate={setCurrentView} />;
      case 'training':
        return <TrainingView />;
      case 'agent':
        return <AgentTLC />;
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
      case 'files':
        return <FileManager />;
      case 'ai':
        return <AIAssistant />;
      case 'enhanced-library':
        return <CompactExerciseLibrary />;
      case 'updates':
        return <UpdatesTab />;
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
