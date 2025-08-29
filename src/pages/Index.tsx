
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CompactDashboard } from "@/components/CompactDashboard";
import TrainingView from "@/components/TrainingView";
import CompactExerciseLibrary from "@/components/CompactExerciseLibrary";
import TimerView from "@/components/TimerView";
import ProgressView from "@/components/ProgressView";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeSelector from "@/components/ThemeSelector";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "training":
        return <TrainingView />;
      case "exercises":
        return <CompactExerciseLibrary />;
      case "timer":
        return <TimerView />;
      case "progress":
        return <ProgressView />;
      default:
        return <CompactDashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar onNavigate={setActiveView} activeView={activeView} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="flex items-center justify-between h-full px-4">
                  <div className="flex items-center space-x-2">
                    <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                    <h1 className="text-xl font-bold text-foreground">Calisthenics Pro</h1>
                  </div>
                  <ThemeSelector />
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-1 overflow-auto">
                <div className="container max-w-7xl mx-auto p-4">
                  {renderView()}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
};

export default Index;
