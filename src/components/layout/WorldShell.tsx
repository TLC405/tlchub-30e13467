import React, { useState, useCallback } from "react";
import { Settings, Download } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeSelector from "@/components/ThemeSelector";
import { DownloadProject } from "@/components/DownloadProject";
import WorldTabBar, {
  WorldId,
  WorldDef,
  DEFAULT_WORLDS,
} from "@/components/layout/WorldTabBar";
import HomePage from "@/worlds/home/HomePage";
import TrainWorld from "@/worlds/train/TrainWorld";
import WatchWorld from "@/worlds/watch/WatchWorld";
import PlayWorld from "@/worlds/play/PlayWorld";
import RewindWorld from "@/worlds/rewind/RewindWorld";
import StudioWorld from "@/worlds/studio/StudioWorld";
import OKCWorld from "@/worlds/okc/OKCWorld";
import WikiWorld from "@/worlds/wiki/WikiWorld";
import AdminPanel from "@/worlds/admin/AdminPanel";
import { APP_WORLD_NAME, APP_WORLD_TAGLINE } from "@/data/controlContent";

const WorldShell: React.FC = () => {
  const [activeWorld, setActiveWorld] = useState<WorldId>("home");
  const [adminOpen, setAdminOpen] = useState(false);

  // Worlds config — in future this comes from admin localStorage
  const [worlds] = useState<WorldDef[]>(DEFAULT_WORLDS);

  const handleSelectWorld = useCallback((id: WorldId) => {
    setActiveWorld(id);
  }, []);

  const renderWorld = () => {
    switch (activeWorld) {
      case "home":
        return <HomePage onNavigate={handleSelectWorld} />;
      case "train":
        return <TrainWorld />;
      case "watch":
        return <WatchWorld />;
      case "play":
        return <PlayWorld />;
      case "rewind":
        return <RewindWorld />;
      case "studio":
        return <StudioWorld />;
      case "okc":
        return <OKCWorld />;
      case "wiki":
        return <WikiWorld />;
      default:
        return <HomePage onNavigate={handleSelectWorld} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Top Header */}
        <header className="h-14 border-b-[3px] border-foreground bg-card sticky top-0 z-40">
          <div className="flex items-center justify-between h-full px-4">
            <button
              className="text-left select-none"
              onClick={() => setActiveWorld("home")}
            >
              <h1 className="font-serif text-xl font-black text-foreground tracking-tight leading-none">
                {APP_WORLD_NAME}
              </h1>
              <p className="text-[9px] text-muted-foreground tracking-widest uppercase leading-none mt-0.5">
                Truth · Love · Connection
              </p>
            </button>
            <div className="flex items-center gap-2">
              <DownloadProject />
              <ThemeSelector />
              <button
                onClick={() => setAdminOpen(true)}
                className="h-8 w-8 flex items-center justify-center border-[2px] border-foreground rounded-md hover:bg-muted transition-colors"
                aria-label="Open admin panel"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* World Tab Bar */}
        <WorldTabBar
          worlds={worlds}
          activeWorld={activeWorld}
          onSelectWorld={handleSelectWorld}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {renderWorld()}
        </main>

        {/* Footer */}
        <footer className="border-t-[3px] border-foreground bg-card py-3 px-4">
          <p className="text-center text-[10px] text-muted-foreground tracking-widest uppercase font-bold">
            Powered by TLC · Men of Purpose OKC Foundation
          </p>
        </footer>

        {/* Admin Panel Overlay */}
        {adminOpen && (
          <AdminPanel onClose={() => setAdminOpen(false)} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default WorldShell;
