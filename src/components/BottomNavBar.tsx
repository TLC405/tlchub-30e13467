import { 
  BookOpen,
  Dumbbell,
  Sparkles,
  Tv,
  MapPin,
} from "lucide-react";
import { APP_COPYRIGHT, APP_POWERED_BY, APP_VERSION } from "@/data/controlContent";

interface BottomNavBarProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

const menuItems = [
  { id: "learn", title: "Learn", icon: BookOpen },
  { id: "training", title: "Train", icon: Dumbbell },
  { id: "skills", title: "Skills", icon: Sparkles },
  { id: "tlctv", title: "TLCtv", icon: Tv },
  { id: "gyms", title: "Gyms", icon: MapPin },
];

export function BottomNavBar({ onNavigate, activeView }: BottomNavBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="flex justify-around items-center py-1.5 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-all duration-200 ${
              activeView === item.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeView === item.id && (
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full transition-all duration-300 animate-slide-in-up" />
            )}
            <item.icon className={`h-5 w-5 mb-1 flex-shrink-0 transition-transform duration-200 ${
              activeView === item.id ? "scale-110" : "scale-100"
            }`} />
            <span className={`text-[10px] font-semibold tracking-wide transition-opacity duration-200 ${
              activeView === item.id ? "opacity-100" : "opacity-70"
            }`}>{item.title}</span>
          </button>
        ))}
      </div>
      <div className="text-center pb-1.5 space-y-0">
        <p className="text-[8px] text-muted-foreground tracking-wide">
          {APP_COPYRIGHT}
        </p>
        <p className="text-[7px] text-muted-foreground/60 tracking-widest uppercase">
          {APP_POWERED_BY} · v{APP_VERSION}
        </p>
      </div>
    </nav>
  );
}
