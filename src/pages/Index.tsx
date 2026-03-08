import React, { useState } from "react";
import LearnPathView from "@/components/LearnPathView";
import TrainingView from "@/components/TrainingView";
import SkillTreeView from "@/components/SkillTreeView";
import IntegrityView from "@/components/IntegrityView";
import TLCtvView from "@/components/TLCtvView";
import GymsClassesView from "@/components/GymsClassesView";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeSelector from "@/components/ThemeSelector";
import { BottomNavBar } from "@/components/BottomNavBar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TLCLogo } from "@/components/TLCLogo";
import { APP_NAME } from "@/data/controlContent";

const Index = () => {
  const [activeView, setActiveView] = useState("training");

  const baseView = activeView.split(":")[0];
  const viewParam = activeView.includes(":") ? activeView.split(":")[1] : undefined;

  const renderView = () => {
    switch (baseView) {
      case "learn":
        return <LearnPathView onNavigate={setActiveView} />;
      case "training":
        return <TrainingView onNavigate={setActiveView} />;
      case "skills":
        return <SkillTreeView initialTreeId={viewParam} onNavigate={setActiveView} />;
      case "integrity":
        return <IntegrityView initialBlockId={viewParam} />;
      case "tlctv":
        return <TLCtvView />;
      case "gyms":
        return <GymsClassesView />;
      default:
        return <TrainingView onNavigate={setActiveView} />;
    }
  };

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-background pb-24">
          <header className="h-12 border-b border-border bg-card sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center gap-2">
                <TLCLogo size="sm" />
                <h1 className="text-sm font-extrabold text-foreground tracking-tight uppercase">
                  {APP_NAME}
                </h1>
              </div>
              <ThemeSelector />
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <div className="container max-w-3xl mx-auto p-4">
              {renderView()}
            </div>
          </main>

          <BottomNavBar onNavigate={setActiveView} activeView={baseView} />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default Index;
