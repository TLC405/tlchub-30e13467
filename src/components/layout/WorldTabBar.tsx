import React from "react";
import { cn } from "@/lib/utils";

export type WorldId =
  | "home"
  | "train"
  | "watch"
  | "play"
  | "rewind"
  | "studio"
  | "okc"
  | "wiki";

export interface WorldDef {
  id: WorldId;
  emoji: string;
  label: string;
  enabled: boolean;
}

export const DEFAULT_WORLDS: WorldDef[] = [
  { id: "home", emoji: "🏠", label: "Home", enabled: true },
  { id: "train", emoji: "🏋️", label: "Train", enabled: true },
  { id: "watch", emoji: "🛡️", label: "Watch", enabled: true },
  { id: "play", emoji: "🎮", label: "Play", enabled: true },
  { id: "rewind", emoji: "📸", label: "Rewind", enabled: true },
  { id: "studio", emoji: "✨", label: "Studio", enabled: true },
  { id: "okc", emoji: "🗺️", label: "OKC", enabled: true },
  { id: "wiki", emoji: "📖", label: "Wiki", enabled: true },
];

interface WorldTabBarProps {
  worlds: WorldDef[];
  activeWorld: WorldId;
  onSelectWorld: (id: WorldId) => void;
}

const WorldTabBar: React.FC<WorldTabBarProps> = ({
  worlds,
  activeWorld,
  onSelectWorld,
}) => {
  const enabled = worlds.filter((w) => w.enabled);

  return (
    <div className="border-b-[3px] border-foreground bg-card sticky top-14 z-30 overflow-x-auto scrollbar-none">
      <div className="flex min-w-max px-2">
        {enabled.map((world) => {
          const isActive = world.id === activeWorld;
          return (
            <button
              key={world.id}
              onClick={() => onSelectWorld(world.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-3 py-2 min-w-[56px] min-h-[56px] border-r-[1px] border-foreground/20 transition-colors select-none",
                isActive
                  ? "bg-foreground text-background"
                  : "bg-card text-foreground hover:bg-muted"
              )}
            >
              <span className="text-lg leading-none">{world.emoji}</span>
              <span className="text-[10px] font-bold tracking-wide uppercase leading-none">
                {world.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WorldTabBar;
