import React, { useState } from "react";
import SubTabBar from "@/components/layout/SubTabBar";
import TrainingView from "@/components/TrainingView";
import CompactExerciseLibrary from "@/components/CompactExerciseLibrary";
import SkillTreeView from "@/components/SkillTreeView";
import IntegrityView from "@/components/IntegrityView";
import LearnPathView from "@/components/LearnPathView";

type TrainTab = "today" | "library" | "skills" | "integrity" | "learn" | "stats";

const TRAIN_TABS = [
  { id: "today", label: "Today" },
  { id: "library", label: "Library" },
  { id: "skills", label: "Skills" },
  { id: "integrity", label: "Integrity" },
  { id: "learn", label: "Learn" },
  { id: "stats", label: "Stats" },
];

const TrainWorld: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TrainTab>("today");
  const [internalNav, setInternalNav] = useState<string | undefined>(undefined);

  const handleNavigate = (view: string) => {
    // Parse parameterized views like "skills:planche-progression" or "integrity:wrist-prep"
    const baseView = view.split(":")[0];
    const viewParam = view.includes(":") ? view.split(":")[1] : undefined;
    setInternalNav(viewParam);
    if (baseView === "skills") {
      setActiveTab("skills");
    } else if (baseView === "integrity") {
      setActiveTab("integrity");
    } else if (baseView === "learn") {
      setActiveTab("learn");
    } else if (baseView === "training") {
      setActiveTab("today");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return <TrainingView onNavigate={handleNavigate} />;
      case "library":
        return <CompactExerciseLibrary />;
      case "skills":
        return (
          <SkillTreeView
            initialTreeId={internalNav}
            onNavigate={handleNavigate}
          />
        );
      case "integrity":
        return <IntegrityView initialBlockId={internalNav} />;
      case "learn":
        return <LearnPathView onNavigate={handleNavigate} />;
      case "stats":
        return (
          <div className="container max-w-3xl mx-auto p-4">
            <div className="border-[3px] border-foreground rounded-2xl p-6 bg-card text-center">
              <div className="text-4xl mb-3">📊</div>
              <h2 className="font-serif text-xl font-black text-foreground mb-2">
                Stats
              </h2>
              <p className="text-sm text-muted-foreground">Coming soon — detailed training analytics and progress charts.</p>
            </div>
          </div>
        );
      default:
        return <TrainingView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col">
      <SubTabBar
        tabs={TRAIN_TABS}
        activeTab={activeTab}
        onSelect={(id) => {
          setActiveTab(id as TrainTab);
          setInternalNav(undefined);
        }}
      />
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default TrainWorld;
