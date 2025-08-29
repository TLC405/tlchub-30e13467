
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import DetailedWeatherWidget from "./DetailedWeatherWidget";
import CompactStats from "./CompactStats";
import CompactTrainingFocus from "./CompactTrainingFocus";
import CompactQuickActions from "./CompactQuickActions";
import ThemeSelector from "./ThemeSelector";
import type { ViewType } from "@/types";

interface CompactDashboardProps {
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

const CompactDashboard = ({ onNavigate, currentView }: CompactDashboardProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar onNavigate={onNavigate} currentView={currentView} />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-14 flex items-center justify-between px-4 border-b border-border/60 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="hidden sm:block">
                <div className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  CALIXTLC Dashboard
                </div>
              </div>
            </div>
            <ThemeSelector />
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Welcome Section */}
              <div className="text-center space-y-2 py-4">
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome Back, Athlete
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your calisthenics journey continues
                </p>
              </div>

              {/* Weather Widget */}
              <DetailedWeatherWidget />

              {/* Stats Grid */}
              <CompactStats />

              {/* Training Focus */}
              <CompactTrainingFocus onNavigate={onNavigate} />

              {/* Quick Actions */}
              <CompactQuickActions onNavigate={onNavigate} />

              {/* Daily Insight */}
              <div className="bg-gradient-to-br from-orange-50/50 to-yellow-50/50 dark:from-orange-950/20 dark:to-yellow-950/20 border border-orange-200/50 dark:border-orange-800/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">💡</span>
                  <h3 className="font-bold text-orange-700 dark:text-orange-300">
                    Daily Insight
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "Consistency beats intensity. Small daily improvements compound into extraordinary results over time."
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CompactDashboard;
