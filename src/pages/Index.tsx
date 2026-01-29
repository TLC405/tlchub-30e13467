import React from "react";
import { CompactDashboard } from "@/components/CompactDashboard";
import TrainingView from "@/components/TrainingView";
import CompactExerciseLibrary from "@/components/CompactExerciseLibrary";
import TimerView from "@/components/TimerView";
import ProgressView from "@/components/ProgressView";
import WorkoutCalendar from "@/components/WorkoutCalendar";
import UpdatesTab from "@/components/UpdatesTab";
import SkillTreeView from "@/components/SkillTreeView";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeSelector from "@/components/ThemeSelector";
import { BottomNavBar } from "@/components/BottomNavBar";
import { useState } from "react";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "training":
        return <TrainingView />;
      case "skills":
        return <SkillTreeView />;
      case "exercises":
        return <CompactExerciseLibrary />;
      case "timer":
        return <TimerView />;
      case "progress":
        return <ProgressView />;
      case "calendar":
        return (
          <div className="p-6">
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl font-bold text-card-foreground">Workout Calendar</h1>
              <p className="text-muted-foreground">Track and log your daily workouts</p>
            </div>
            <WorkoutCalendar />
          </div>
        );
      case "updates":
        return (
          <div className="p-6">
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl font-bold text-card-foreground">App Updates</h1>
              <p className="text-muted-foreground">Latest features and improvements</p>
            </div>
            <UpdatesTab />
          </div>
        );
      default:
        return <CompactDashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center justify-between h-full px-4">
            <h1 className="text-xl font-bold text-foreground">Calisthenics Pro</h1>
            <ThemeSelector />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container max-w-7xl mx-auto p-4">
            {renderView()}
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNavBar onNavigate={setActiveView} activeView={activeView} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
