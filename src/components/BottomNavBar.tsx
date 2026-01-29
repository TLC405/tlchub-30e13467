import { 
  Home,
  Dumbbell,
  BookOpen,
  Timer,
  Calendar,
  Info,
  GitBranch,
} from "lucide-react";

interface BottomNavBarProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

const menuItems = [
  { id: "dashboard", title: "Home", icon: Home },
  { id: "training", title: "Training", icon: Dumbbell },
  { id: "skills", title: "Skills", icon: GitBranch },
  { id: "exercises", title: "Exercises", icon: BookOpen },
  { id: "timer", title: "Timer", icon: Timer },
  { id: "calendar", title: "Calendar", icon: Calendar },
  { id: "updates", title: "Updates", icon: Info },
];

export function BottomNavBar({ onNavigate, activeView }: BottomNavBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="flex justify-around items-center py-2 px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors ${
              activeView === item.id
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <item.icon className="h-5 w-5 mb-1 flex-shrink-0" />
            <span className="text-xs font-medium truncate">{item.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
