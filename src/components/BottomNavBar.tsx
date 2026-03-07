import { 
  BookOpen,
  Dumbbell,
  GitBranch,
  Brain,
  MapPin,
} from "lucide-react";

interface BottomNavBarProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

const menuItems = [
  { id: "learn", title: "Learn", icon: BookOpen },
  { id: "training", title: "Train", icon: Dumbbell },
  { id: "skills", title: "Skills", icon: GitBranch },
  { id: "coach", title: "Coach", icon: Brain },
  { id: "gyms", title: "Gyms", icon: MapPin },
];

export function BottomNavBar({ onNavigate, activeView }: BottomNavBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t-[3px] border-foreground">
      <div className="flex justify-around items-center py-1 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-[16px] transition-colors ${
              activeView === item.id
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5 mb-1 flex-shrink-0" />
            <span className="text-[10px] font-semibold tracking-wide">{item.title}</span>
          </button>
        ))}
      </div>
      <div className="text-center pb-1">
        <span className="text-[8px] text-muted-foreground tracking-widest uppercase">
          Powered by TLC · Men of Purpose OKC
        </span>
      </div>
    </nav>
  );
}
