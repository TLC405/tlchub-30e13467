
import { useState } from "react";
import type { ViewType } from "@/types";

// Import all view components
import CompactDashboard from "@/components/CompactDashboard";
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

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <CompactDashboard onNavigate={setCurrentView} currentView={currentView} />;
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
        return <CompactDashboard onNavigate={setCurrentView} currentView={currentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderView()}
    </div>
  );
};

export default Index;
