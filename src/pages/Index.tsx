import React, { useState } from "react";
import LearnPathView from "@/components/LearnPathView";
import TrainingView from "@/components/TrainingView";
import SkillTreeView from "@/components/SkillTreeView";
import IntegrityView from "@/components/IntegrityView";
import AgentTLC from "@/components/AgentTLC";
import GymsClassesView from "@/components/GymsClassesView";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeSelector from "@/components/ThemeSelector";
import { DownloadProject } from "@/components/DownloadProject";
import { BottomNavBar } from "@/components/BottomNavBar";
import { APP_NAME, APP_TAGLINE, APP_POWERED_BY } from "@/data/controlContent";

const Index = () => {
  const [activeView, setActiveView] = useState("training");

  // Parse parameterized views like "skills:planche-progression" or "integrity:wrist-prep"
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
      case "coach":
        return <AgentTLC />;
      case "gyms":
        return <GymsClassesView />;
      default:
        return <TrainingView onNavigate={setActiveView} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <header className="h-14 border-b-[3px] border-foreground bg-card sticky top-0 z-40">
          <div className="flex items-center justify-between h-full px-4">
            <div>
              <h1 className="font-serif text-xl font-black text-foreground tracking-tight leading-none">
                {APP_NAME}
              </h1>
              <p className="text-[9px] text-muted-foreground tracking-widest uppercase leading-none mt-0.5">
                {APP_TAGLINE}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-primary font-bold tracking-wider uppercase hidden sm:inline">
                {APP_POWERED_BY}
              </span>
              <DownloadProject />
              <ThemeSelector />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container max-w-3xl mx-auto p-4">
            {renderView()}
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNavBar onNavigate={setActiveView} activeView={baseView} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
