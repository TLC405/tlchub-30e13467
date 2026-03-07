import React from "react";
import { cn } from "@/lib/utils";

export interface SubTab {
  id: string;
  label: string;
}

// Height of header (56px) + world tab bar (56px) = 112px total offset for sticky positioning
const SUB_TAB_BAR_TOP = "112px";

interface SubTabBarProps {
  tabs: SubTab[];
  activeTab: string;
  onSelect: (id: string) => void;
}

const SubTabBar: React.FC<SubTabBarProps> = ({ tabs, activeTab, onSelect }) => {
  return (
    <div className="border-b-[2px] border-foreground bg-background overflow-x-auto scrollbar-none" style={{ position: "sticky", top: SUB_TAB_BAR_TOP, zIndex: 20 }}>
      <div className="flex min-w-max px-2 gap-1 py-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-bold tracking-wide uppercase rounded-sm border-[2px] border-foreground transition-colors whitespace-nowrap min-h-[36px]",
                isActive
                  ? "bg-foreground text-background"
                  : "bg-card text-foreground hover:bg-muted"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubTabBar;
