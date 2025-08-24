import { Button } from "@/components/ui/button";
import type { ViewType } from "@/types";
import { 
  LayoutDashboard, 
  Dumbbell, 
  TrendingUp, 
  BookOpen, 
  Timer,
  Settings
} from "lucide-react";

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'training' as ViewType, label: 'Training', icon: Dumbbell },
    { id: 'progress' as ViewType, label: 'Progress', icon: TrendingUp },
    { id: 'library' as ViewType, label: 'Library', icon: BookOpen },
    { id: 'timer' as ViewType, label: 'Timer', icon: Timer },
  ];

  return (
    <div className="w-64 glass-card leather-texture border-r border-card-border premium-shadow h-[calc(100vh-4rem)]">
      <div className="p-6 space-y-2">
        <h2 className="text-lg font-semibold text-card-foreground mb-6">Navigation</h2>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive 
                  ? 'primary-gradient text-primary-foreground gold-shadow' 
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-background-secondary/50'
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
        
        <div className="pt-6 mt-6 border-t border-card-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-card-foreground hover:bg-background-secondary/50"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;