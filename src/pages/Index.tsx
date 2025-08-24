import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import TrainingView from "@/components/TrainingView";
import ProgressView from "@/components/ProgressView";
import ExerciseLibrary from "@/components/ExerciseLibrary";
import TimerView from "@/components/TimerView";
import type { ViewType } from "@/types";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'training':
        return <TrainingView />;
      case 'progress':
        return <ProgressView />;
      case 'library':
        return <ExerciseLibrary />;
      case 'timer':
        return <TimerView />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default Index;